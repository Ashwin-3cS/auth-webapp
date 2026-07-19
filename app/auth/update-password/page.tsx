import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <main className="flex min-h-[calc(100svh-73px)] w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <UpdatePasswordForm />
      </div>
    </main>
  );
}
