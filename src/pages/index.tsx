import Header from "../components/Header";
import PageWrapper from "../components/PageWrapper";
import CreatePost from "~/components/CreatePost";
import { api } from "~/utils/api";
import { PostSkeletonLoader } from "~/components/Loader";
import { PostBox } from "~/components/PostBox";
import { useSession } from "next-auth/react";

export default function Explore() {
  const { data: posts, isLoading, isError } = api.post.getAllPosts.useQuery();
  const session = useSession()

  return (
    <PageWrapper>
      <div>
        <Header />
      </div>


      <div className="mt-10 flex flex-col gap-10">
        {session.status === "authenticated" && <CreatePost />}

        <div className="flex flex-col gap-5">
          {isLoading || !posts ? (
            <PostSkeletonLoader />
          ) : posts && posts.length > 0 ? (
            posts.map((post) => <PostBox key={post.id} post={post} />)
          ) : (
            <p>No posts found</p>
          )}
        </div>

        <div>Some footer hopefully</div>
      </div>
    </PageWrapper>
  );
}
