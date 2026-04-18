'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRole } from '@/src/lib/api/auth/types';
import {
  createSystemInviteSchema,
  systemInviteRoles,
  useCreateSystemInvite,
} from '@/src/lib/api/system-invites';
import { Button } from '@/src/components/shadcn/button';
import { Input } from '@/src/components/shadcn/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/shadcn/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/shadcn/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/shadcn/card';
import { Loader2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/src/components/ui/page-header';

type InviteFormValues = {
  email: string;
  roleToAssign: UserRole;
};

function formatRoleLabel(role: UserRole) {
  return role.toLowerCase().replaceAll('_', ' ');
}

export default function SystemInvitesPage() {
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(createSystemInviteSchema),
    defaultValues: {
      email: '',
      roleToAssign: UserRole.MENTOR,
    },
  });

  const { mutateAsync: createSystemInvite, isPending } = useCreateSystemInvite();

  const onSubmit = async (data: InviteFormValues) => {
    try {
      await createSystemInvite(data);
      toast.success('Successfully sent invite');
      form.reset();
    } catch {
      toast.error('Failed to send invite. Please try again.');
    }
  };

  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <PageHeader
        title="System Invites"
        description="Invite users to any supported platform role."
      />

      <Card>
        <CardHeader>
          <CardTitle>Send Invite</CardTitle>
          <CardDescription>
            Create an invite link that will be sent via email to the user.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="user@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleToAssign"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {systemInviteRoles.map((role) => (
                          <SelectItem key={role} value={role} className="capitalize">
                            {formatRoleLabel(role)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Send Invitation
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
