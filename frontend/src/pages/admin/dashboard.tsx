import { Card, CardHeader, CardBody } from "@heroui/react";
import api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";

interface StatItem {
  _id: string;
  count: number;
}

interface StatsResponse {
  total: number;
  byType: StatItem[];
  byStatus: StatItem[];
}

export default function AdminDashboard() {
  const fetchData = async (): Promise<StatsResponse> => {
    const response = await api.get("/admin/stats");
    return response.data;
  };

  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery<StatsResponse>({
    queryKey: ["stats"],
    queryFn: fetchData,
    refetchInterval: 5000,
  });

  if (isLoading) return <div className="p-8 text-default-400 font-mono">Loading...</div>;
  if (isError || !stats) return <div className="p-8 text-default-400 font-mono">Error or no data</div>;

  return (
    <div className="flex flex-col gap-6 p-4 ">
      <div>
        <h1 className="text-2xl font-bold uppercase tracking-wider text-white">
          System Stats
        </h1>
        <p className="text-default-400 text-small">Data overview</p>
      </div>

      <div className="flex items-center gap-4 bg-content1 p-6 rounded-2xl border-1 border-divider bg-zinc-900">
        <div className="flex flex-col">
          <span className="text-tiny text-primary font-bold uppercase">
            Total Reports
          </span>
          <span className="text-5xl font-black italic text-white">
            {stats.total}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {stats.byType.map((el) => (
          <Card
            key={el._id}
            className="flex-1 min-w-[240px] bg-zinc-900 border-1 border-white/5 shadow-none"
          >
            <CardHeader className="flex flex-col items-start px-5 pt-5 pb-0">
              <span className="text-[10px] text-default-400 uppercase font-mono tracking-tighter">
                Category
              </span>
              <h4 className="text-xl font-bold capitalize text-white">
                {el._id}
              </h4>
            </CardHeader>
            <CardBody className="px-5 py-4">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-light text-white">
                  {el.count}
                </span>
                <span className="text-xs text-default-500 mb-1">entries</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {stats.byStatus.map((el) => (
          <Card
            key={el._id}
            className="flex-1 min-w-[240px] bg-zinc-900 border-1 border-white/5 shadow-none"
          >
            <CardHeader className="flex flex-col items-start px-5 pt-5 pb-0">
              <span className="text-[10px] text-default-400 uppercase font-mono tracking-tighter">
                Category
              </span>
              <h4 className="text-xl font-bold capitalize text-white">
                {el._id}
              </h4>
            </CardHeader>
            <CardBody className="px-5 py-4">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-light text-white">
                  {el.count}
                </span>
                <span className="text-xs text-default-500 mb-1">entries</span>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
