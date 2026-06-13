import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { defineComponent, nextTick, reactive, ref } from 'vue';
import { useFieldValidation } from '@/hooks/use-field-validation';
import { NmorphCheckboxGroup, NmorphForm, NmorphFormItem, NmorphTextInput } from '@/components';
import { checkboxOptions, createTestFile } from '@test/utils/components';

describe('NmorphForm', () => {
  it('validates file values with file-specific form rules', () => {
    const pngFile = createTestFile('avatar.png', 'image/png');
    const pdfFile = createTestFile('report.pdf', 'application/pdf');
    const largeFile = new File(['12345'], 'large.png', { type: 'image/png' });

    const maxSizeValidation = useFieldValidation({
      inputValue: [largeFile],
      rules: [{ fileMaxSize: 3, error: 'File is too large' }],
    });
    maxSizeValidation.validate();

    expect(maxSizeValidation.valid.value).toBe(false);
    expect(maxSizeValidation.errors.value).toEqual(['File is too large']);

    const allowedTypesValidation = useFieldValidation({
      inputValue: [{ data: pdfFile, previewUrl: 'blob:pdf' }],
      rules: [{ fileAllowedTypes: ['png'], error: 'Unsupported file type' }],
    });
    allowedTypesValidation.validate();

    expect(allowedTypesValidation.valid.value).toBe(false);
    expect(allowedTypesValidation.errors.value).toEqual(['Unsupported file type']);

    const maxCountValidation = useFieldValidation({
      inputValue: [pngFile, pdfFile],
      rules: [{ fileMaxCount: 1, error: 'Too many files' }],
    });
    maxCountValidation.validate();

    expect(maxCountValidation.valid.value).toBe(false);
    expect(maxCountValidation.errors.value).toEqual(['Too many files']);
  });

  it('binds a nested text input to the NmorphFormItem field when modelValue is omitted', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphForm, NmorphFormItem, NmorphTextInput },
        setup() {
          const formRef = ref(null);
          const formValue = reactive({
            chatName: {
              value: '',
              rules: [{ pattern: /.{3,}/, error: 'Too short' }],
            },
          });

          return { formRef, formValue };
        },
        template: `
          <NmorphForm ref="formRef" :value="formValue">
            <NmorphFormItem id="chatName">
              <NmorphTextInput />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    const input = wrapper.find('input');
    await input.setValue('ab');
    await nextTick();

    expect(wrapper.vm.formValue.chatName.value).toBe('ab');
    expect(wrapper.text()).toContain('Too short');
    expect(wrapper.findComponent(NmorphTextInput).emitted('update:model-value')?.at(-1)).toEqual(['ab']);

    await input.setValue('abcd');
    await nextTick();

    const field = wrapper.vm.formRef.formData.fields.chatName;
    expect(wrapper.vm.formValue.chatName.value).toBe('abcd');
    expect(Array.isArray(field.errors) ? field.errors : field.errors.value).toEqual([]);
    expect(typeof field.valid === 'boolean' ? field.valid : field.valid.value).toBe(true);

    wrapper.unmount();
  });

  it('keeps explicit text input v-model controlled inside NmorphFormItem', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphForm, NmorphFormItem, NmorphTextInput },
        setup() {
          const localValue = ref('');
          const formValue = reactive({
            chatName: {
              value: '',
              rules: [{ pattern: /.{3,}/, error: 'Too short' }],
            },
          });

          return { formValue, localValue };
        },
        template: `
          <NmorphForm :value="formValue">
            <NmorphFormItem id="chatName">
              <NmorphTextInput v-model="localValue" />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    await wrapper.find('input').setValue('local');
    await nextTick();

    expect(wrapper.vm.localValue).toBe('local');
    expect(wrapper.vm.formValue.chatName.value).toBe('');

    wrapper.unmount();
  });

  it('binds checkbox group selections to the NmorphFormItem field when modelValue is omitted', async () => {
    const wrapper = mount(
      defineComponent({
        components: { NmorphCheckboxGroup, NmorphForm, NmorphFormItem },
        setup() {
          const formValue = reactive({
            browsers: {
              value: [] as string[],
              rules: [{ arrayCompareType: 'contains-one', compareValue: ['chrome'], error: 'Chrome is required' }],
            },
          });

          return { checkboxOptions, formValue };
        },
        template: `
          <NmorphForm :value="formValue">
            <NmorphFormItem id="browsers">
              <NmorphCheckboxGroup :options="checkboxOptions" />
            </NmorphFormItem>
          </NmorphForm>
        `,
      })
    );

    await wrapper.findAll('input[type="checkbox"]')[0].trigger('change');
    await nextTick();

    expect(wrapper.vm.formValue.browsers.value).toEqual(['first']);

    wrapper.unmount();
  });
});
