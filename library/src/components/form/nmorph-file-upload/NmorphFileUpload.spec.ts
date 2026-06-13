import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { NmorphFileUpload, NmorphForm, NmorphFormItem } from '@/components';
import { createTestFile, setFileInputState, mockObjectUrlApi } from '@test/utils/components';
import type { FileUploadValue } from '@test/utils/components';

describe('NmorphFileUpload', () => {
  it('emits a new file list, clears input, and revokes preview when removing a file', async () => {
    const objectUrls = mockObjectUrlApi(['blob:first', 'blob:second']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
        multiple: true,
      },
    });

    try {
      const firstFile = createTestFile('first.png');
      const secondFile = createTestFile('second.png');
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [firstFile, secondFile]);
      await inputWrapper.trigger('change');
      await nextTick();

      const firstPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      await wrapper.setProps({ modelValue: firstPayload });
      await nextTick();
      setFileInputState(input, [], 'selected');

      await wrapper.findAll('.nmorph-file-upload__remove-file .nmorph-button')[0].trigger('click');
      await nextTick();

      const lastPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(lastPayload).not.toBe(firstPayload);
      expect(lastPayload).toHaveLength(1);
      expect(lastPayload[0].data.name).toBe('second.png');
      expect(firstPayload).toHaveLength(2);
      expect(input.value).toBe('');
      expect(objectUrls.revokeObjectURL).toHaveBeenCalledWith('blob:first');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('clears native file input after upload so the same file can be selected after reset', async () => {
    const objectUrls = mockObjectUrlApi(['blob:first', 'blob:second']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
      },
    });

    try {
      const file = createTestFile('avatar.png');
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [file]);
      await inputWrapper.trigger('change');
      await nextTick();

      const firstPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(firstPayload).toHaveLength(1);
      expect(input.value).toBe('');

      await wrapper.setProps({ modelValue: firstPayload });
      await wrapper.setProps({ modelValue: [] });
      await nextTick();

      setFileInputState(input, [file]);
      await inputWrapper.trigger('change');
      await nextTick();

      const lastPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(objectUrls.createObjectURL).toHaveBeenCalledTimes(2);
      expect(objectUrls.revokeObjectURL).toHaveBeenCalledWith('blob:first');
      expect(lastPayload).toHaveLength(1);
      expect(lastPayload[0].previewUrl).toBe('blob:second');
      expect(input.value).toBe('');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('accepts non-image files by default without rendering image previews', async () => {
    const objectUrls = mockObjectUrlApi(['blob:report']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;
      const file = createTestFile('report.pdf', 'application/pdf');

      setFileInputState(input, [file]);
      await inputWrapper.trigger('change');
      await nextTick();

      const payload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(payload).toHaveLength(1);
      expect(payload[0].data.name).toBe('report.pdf');
      expect(wrapper.emitted('on-unsupported-file-type-error')).toBeUndefined();
      expect(wrapper.find('.nmorph-image-preview').exists()).toBe(false);
      expect(wrapper.find('.nmorph-file-card').exists()).toBe(true);
      expect(wrapper.find('.nmorph-file-card__name').text()).toBe('report.pdf');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('syncs file upload list when model value is cleared from outside', async () => {
    const initialValue: FileUploadValue[] = [
      {
        data: createTestFile('avatar.png'),
        previewUrl: 'blob:external',
      },
    ];
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: initialValue,
      },
    });

    await nextTick();

    const input = wrapper.find('input[type="file"]').element as HTMLInputElement;
    setFileInputState(input, [], 'selected');

    expect(wrapper.find('.nmorph-file-upload__file-name').text()).toBe('avatar.png');

    await wrapper.setProps({ modelValue: [] });
    await nextTick();

    expect(wrapper.find('.nmorph-file-upload__file').exists()).toBe(false);
    expect(input.value).toBe('');

    wrapper.unmount();
  });

  it('clears unsupported file selections without adding them to input list', async () => {
    const objectUrls = mockObjectUrlApi();
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
        allowedTypes: ['png'],
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [createTestFile('report.pdf', 'application/pdf')]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.emitted('on-unsupported-file-type-error')?.at(-1)).toEqual(['application/pdf']);
      expect(wrapper.emitted('update:model-value')).toBeUndefined();
      expect(wrapper.find('.nmorph-file-upload__file').exists()).toBe(false);
      expect(input.value).toBe('');
      expect(objectUrls.createObjectURL).not.toHaveBeenCalled();
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('renders video and audio previews for uploaded media files', async () => {
    const objectUrls = mockObjectUrlApi(['blob:video', 'blob:audio']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
        multiple: true,
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [createTestFile('clip.mp4', 'video/mp4'), createTestFile('voice.mp3', 'audio/mpeg')]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.find('.nmorph-video-preview').exists()).toBe(true);
      expect(wrapper.find('.nmorph-audio-preview').exists()).toBe(true);
      expect(wrapper.findAll('.nmorph-file-upload__file')).toHaveLength(2);
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('rejects file upload through NmorphFormItem rules before accepting a file', async () => {
    const objectUrls = mockObjectUrlApi(['blob:valid']);
    const wrapper = mount(
      defineComponent({
        components: { NmorphFileUpload, NmorphForm, NmorphFormItem },
        setup() {
          const formRef = ref(null);
          const formValue = reactive({
            avatar: {
              value: [] as FileUploadValue[],
              rules: [{ fileMaxSize: 3, error: 'File is too large' }],
            },
          });

          return { formRef, formValue };
        },
        template: `
          <NmorphForm ref="formRef" :value="formValue">
            <NmorphFormItem id="avatar">
              <NmorphFileUpload v-model="formValue.avatar.value" />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [new File(['12345'], 'large.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();

      const upload = wrapper.findComponent(NmorphFileUpload);
      const getAvatarErrors = () => {
        const errors = wrapper.vm.formRef.formData.fields.avatar.errors;
        return Array.isArray(errors) ? errors : errors.value;
      };
      const getIsAnyTouched = () => {
        const touched = wrapper.vm.formRef.formData.isAnyTouched;
        return typeof touched === 'boolean' ? touched : touched.value;
      };

      expect(upload.emitted('update:model-value')).toBeUndefined();
      expect(upload.emitted('on-file-validation-error')?.at(-1)?.[0]).toMatchObject({
        errors: ['File is too large'],
      });
      expect(wrapper.vm.formValue.avatar.value).toHaveLength(0);
      expect(getAvatarErrors()).toEqual(['File is too large']);
      expect(getIsAnyTouched()).toBe(true);
      expect(wrapper.text()).toContain('File is too large');
      expect(objectUrls.createObjectURL).not.toHaveBeenCalled();

      setFileInputState(input, [new File(['ok'], 'avatar.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();
      await nextTick();

      expect(wrapper.vm.formValue.avatar.value).toHaveLength(1);
      expect(wrapper.vm.formValue.avatar.value[0].previewUrl).toBe('blob:valid');
      expect(getAvatarErrors()).toEqual([]);
      expect(objectUrls.createObjectURL).toHaveBeenCalledTimes(1);
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('replaces single file uploads and revokes the previous generated preview URL', async () => {
    const objectUrls = mockObjectUrlApi(['blob:first', 'blob:second']);
    const wrapper = mount(NmorphFileUpload, {
      props: {
        modelValue: [],
      },
    });

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [createTestFile('first.png')]);
      await inputWrapper.trigger('change');
      await nextTick();

      const firstPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];
      await wrapper.setProps({ modelValue: firstPayload });

      setFileInputState(input, [createTestFile('second.png')]);
      await inputWrapper.trigger('change');
      await nextTick();

      const secondPayload = wrapper.emitted('update:model-value')?.at(-1)?.[0] as FileUploadValue[];

      expect(secondPayload).toHaveLength(1);
      expect(secondPayload[0].data.name).toBe('second.png');
      expect(secondPayload[0].previewUrl).toBe('blob:second');
      expect(objectUrls.revokeObjectURL).toHaveBeenCalledWith('blob:first');
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });

  it('binds file upload value to the NmorphFormItem field when modelValue is omitted', async () => {
    const objectUrls = mockObjectUrlApi(['blob:avatar']);
    const wrapper = mount(
      defineComponent({
        components: { NmorphFileUpload, NmorphForm, NmorphFormItem },
        setup() {
          const formValue = reactive({
            avatar: {
              value: [] as FileUploadValue[],
              rules: [{ fileMaxSize: 3, error: 'File is too large' }],
            },
          });

          return { formValue };
        },
        template: `
          <NmorphForm :value="formValue">
            <NmorphFormItem id="avatar">
              <NmorphFileUpload />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    try {
      const inputWrapper = wrapper.find('input[type="file"]');
      const input = inputWrapper.element as HTMLInputElement;

      setFileInputState(input, [new File(['12345'], 'large.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.vm.formValue.avatar.value).toHaveLength(0);
      expect(objectUrls.createObjectURL).not.toHaveBeenCalled();
      expect(wrapper.text()).toContain('File is too large');

      setFileInputState(input, [new File(['ok'], 'avatar.png', { type: 'image/png' })]);
      await inputWrapper.trigger('change');
      await nextTick();

      expect(wrapper.vm.formValue.avatar.value).toHaveLength(1);
      expect(wrapper.vm.formValue.avatar.value[0].previewUrl).toBe('blob:avatar');
      expect(wrapper.findComponent(NmorphFileUpload).emitted('update:model-value')?.at(-1)?.[0]).toHaveLength(1);
    } finally {
      wrapper.unmount();
      objectUrls.restore();
    }
  });
});
