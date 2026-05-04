import { ref, reactive } from 'vue';
import { INmorphNotification } from '@/components/providers';
import { generateUUID } from '@/utils';

export const useNmorphNotification = () => {
  const notifications = ref<INmorphNotification[]>([]);

  const initOptions = {
    duration: 3000,
    closable: true,
    fill: true,
    width: '330px',
  };

  const notify = (options: INmorphNotification) => {
    const defaultOptions = {
      id: generateUUID(),
      ...initOptions,
    };

    const notification: INmorphNotification = reactive({
      ...defaultOptions,
      ...options,
    });

    notifications.value.push(notification);

    if (notification.duration !== 0) {
      setTimeout(() => removeNotification(notification.id), notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  return {
    notifications,
    notify,
    removeNotification,
  };
};
