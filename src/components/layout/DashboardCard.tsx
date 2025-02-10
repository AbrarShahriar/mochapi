interface Props {
  Icon: React.ElementType;
  title: JSX.Element;
  value: string | number | boolean;
  subtitle?: string;
}

export default function DashboardCard({ title, Icon, subtitle, value }: Props) {
  return (
    <div className="rounded-xl border border-zinc-700 bg-transparent shadow">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="tracking-tight text-sm font-medium">{title}</div>
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
