import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { getProjectsData } from "@/features/project/api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { logout, loading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsData,
  });

  if (isLoading) {
    return <p>Projects...</p>;
  }

  return (
    <>
      <section>
        Home
        <Button onClick={logout} disabled={loading}>
          Logout
        </Button>
        <div>
          <h1>Projects</h1>

          {data?.data?.map((project) => (
            <div>{JSON.stringify(project)}</div>
          ))}
        </div>
      </section>

      <section>
        <h1>Add Project</h1>
        <form></form>
      </section>
    </>
  );
}
