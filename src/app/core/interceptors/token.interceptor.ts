import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token'); // LocalStorage'dan token al

  if (token) {
    // Authorization başlığını isteğe ekle
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(authReq); // İşlemeye devam et
  }

  // Token yoksa orijinal isteği devam ettir
  return next(req);
};
