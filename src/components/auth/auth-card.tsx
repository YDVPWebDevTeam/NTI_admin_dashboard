import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/shadcn/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <Card className="border-slate-300/70 bg-white/90 shadow-xl backdrop-blur">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl text-slate-900">{title}</CardTitle>
        <CardDescription className="text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
