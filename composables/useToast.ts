export type ToastType = 'success' | 'error' | 'info';

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

let toastId = 0;

export function useToast() {
  const toasts = useState<ToastItem[]>('toasts', () => []);

  const remove = (id: number) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const add = (message: string, type: ToastType = 'info', duration = 3000) => {
    const id = ++toastId;
    toasts.value = [...toasts.value, { id, message, type }];

    if (import.meta.client && duration > 0) {
      setTimeout(() => remove(id), duration);
    }

    return id;
  };

  return {
    toasts,
    add,
    remove,
    success: (message: string, duration?: number) => add(message, 'success', duration),
    error: (message: string, duration?: number) => add(message, 'error', duration),
    info: (message: string, duration?: number) => add(message, 'info', duration),
  };
}
