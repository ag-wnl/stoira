import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { PostPageSkeletonLoader } from "~/components/Loader";
import PageWrapper from "~/components/PageWrapper";
import { api } from "~/utils/api";
import CommentBox from "~/components/CommentBox";
import Avatar from "~/components/Avatar";
import { ToolTipButton } from "~/components/CustomButton";

export default function Profile() {
  const session = useSession();
  const router = useRouter();
  const { postId } = router.query;

  const postIdNumber = Array.isArray(postId)
    ? Number(postId[0])
    : Number(postId);

  const validPostId = typeof postIdNumber === "number" ? postIdNumber : null;

  const {
    data: post,
    isLoading,
    isError,
  } = api.post.getPostById.useQuery(
    { postId: postIdNumber },
    { enabled: !!validPostId },
  );

  return (
    <PageWrapper>
        <div>
            <Header />
            {!post ? (
            <PostPageSkeletonLoader />
            ) : (
            <div className="flex flex-col">
                <div className="border-b border-gray-400 bg-[#4C3575] p-2">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2 md:gap-4">
                    <Avatar
                        src={post.createdBy.image}
                        username={post.createdBy.name}
                    />
                    <span className="text-sm text-gray-300">
                        @{post.createdBy.name}
                    </span>
                    </div>
                </div>
                </div>
                <div className="flex flex-col gap-4 bg-[#060606]  p-4">
                <div className="mt-5">
                    <span className="text-md font-bold md:text-lg">
                    {post.title}
                    </span>
                </div>
                <div className="mb-5">
                    <span className="text-xs text-gray-100 md:text-sm ">
                    {post.name}
                    </span>
                </div>

                <div className="flex gap-2 font-normal text-sm text-gray-300">
                  <ToolTipButton>Request</ToolTipButton>
                  <ToolTipButton>Chat</ToolTipButton>
                </div>

                <CommentBox postId={post.id} />
                </div>
            </div>
            )}
        </div>
    </PageWrapper>
  );
}
