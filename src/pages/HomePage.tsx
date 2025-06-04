import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/api/useLogout";
import { getProjectsData } from "@/features/project/project.api";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { mutate: logout, isPending: isLogoutLoading } = useLogout();
  const { data, isLoading: isProjectLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsData,
  });

  if (isProjectLoading) {
    return <p>Projects...</p>;
  }

  return (
    <>
      <section>
        Home
        <Button onClick={() => logout()} disabled={isLogoutLoading}>
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
