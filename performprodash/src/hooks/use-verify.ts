import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth, finishInitialLoad, logout } from '@/redux/features/authSlice';
import { useVerifyMutation, useRefreshMutation } from '@/redux/features/authApiSlice';
import { useRouter } from 'next/navigation';

export default function useVerify() {
  const dispatch = useAppDispatch();
  const [verify] = useVerifyMutation();
  const [refresh] = useRefreshMutation();
  const router = useRouter();

  useEffect(() => {
    verify(undefined)
      .unwrap()
      .then(() => {
        dispatch(setAuth());
      })
      .catch(() => {
        refresh(undefined)
          .unwrap()
          .then(() => {
            dispatch(setAuth());
          })
          .catch(() => {
            dispatch(logout());
            router.push('/auth/login');
          })
          .finally(() => {
            dispatch(finishInitialLoad());
          });
      })
      .finally(() => {
        dispatch(finishInitialLoad());
      });
  }, []);
}