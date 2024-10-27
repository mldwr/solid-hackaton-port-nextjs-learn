//import AcmeLogo from '@/app/ui/acme-logo';
//import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main class="flex items-center justify-center md:h-screen">
      <div class="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div class="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div class="w-32 text-white md:w-36">
            {/* <AcmeLogo /> */} AcmeLogo
          </div>
        </div>
        {/* <LoginForm /> */} LoginForm
      </div>
    </main>
  );
}