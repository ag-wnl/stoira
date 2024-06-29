import { useSession } from "next-auth/react";
import { AvatarSmaller } from "./Avatar";
import CustomButton from "./CustomButton";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { SkeletonCircle, Textarea, CardBody, Card, AlertIcon, Alert } from '@chakra-ui/react'
import { CommentSkeletonLoader } from "./Loader";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

type commentParams = {
    postId: number;
};

type CommentType = {
    id: number;
    author: {
        name: string | null;
        image: string | null;
    }
    createdAt: Date;
    updatedAt: Date;
    content: string;
    postId: number;
    replies?: CommentType[]; // Nested replies
    parentCommentId?: number | null;
};

type CommentDisplayParams = {
    comment: CommentType;
    comments: CommentType[]
};

// This also contains the comment tree formation :
function CommentDisplayBox({ comment, comments }: CommentDisplayParams) {
    const [input, setInput] = useState<string>("");
    const [reply, setReply] = useState<boolean>(false);
    const [showReply, setShowReply] = useState<boolean>(true);

    const createCommentReply = api.comment.createReply.useMutation({
        onSuccess: () => {
            setInput("")
        },
        onError: (err) => {console.error("Error in posting - ", err)}
    })

    const commentReplies = comments.filter(c => c.parentCommentId === comment.id)

    const handleCommentSubmit = async () => {
        if (input.trim().length === 0) {
            return;
        }
        createCommentReply.mutate({content: input, postId:comment.postId, parentCommentId: comment.id});
    };

    return (
        <>
        <div className="p-4 border-b">
            <div>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <AvatarSmaller src={comment.author.image} username={comment.author.name} /> 
                        <span className="text-xs text-gray-300">@{comment.author.name}</span>
                    </div>

                    <div className="text-[10px] text-gray-300">{new Date(comment.createdAt).toLocaleString()}</div>
                </div>

                <div className="text-xs">
                    {comment.content}
                </div>

                {/* Bottom bar of comment */}
                <div className="flex gap-4 text-xs text-gray-300 mt-4 items-center">
                    <button className="cursor-pointer" onClick={e => setReply(!reply)}>Reply</button>
                    {commentReplies?.length ? <button onClick={e => setShowReply(!showReply)}>{showReply ? <MinusIcon color='purple.200' /> : <AddIcon color='purple.200' />}</button> : ''}
                </div>
            </div>
            </div>

            {reply && 
            <div>
                <Textarea 
                value = {input}
                size='sm'
                onChange={e => {setInput(e.currentTarget.value)}}
                className="flex-grow resize-none bg-transparent rounded-sm p-2 overflow-auto outline-none mt-4"  
                placeholder='Reply to comment...' />
                
                <CustomButton 
                onClick={e => handleCommentSubmit()}
                className="m-2" gray={true} small={true}>Post</CustomButton>
            </div> 
            }
        </div>
        

        {/* recursive show reply */}
        {showReply && commentReplies && commentReplies.length > 0 && (
                <div className="ml-4 border-l-2">
                    {commentReplies.map((reply) => (
                        <CommentDisplayBox key={reply.id} comment={reply} comments={comments} /> 
                    ))}
                </div>
            )}
        </>
    )
}

export default function CommentBox({postId} : commentParams) {
    const session = useSession();

    const [input, setInput] = useState<string>("");
    const {data: comments, isLoading, isError} = api.comment.getCommentsByPostId.useQuery({postId: postId})
    console.log("comments - ", comments)

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);


    const createComment = api.comment.createComment.useMutation({
        onSuccess: () => {
            setInput("")
            setLoading(false)
        },
        onError: (err) => {setError(true); console.error("Error in posting - ", err)}
    })

    const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.trim().length === 0) {
            return;
        }
        setLoading(true);
        createComment.mutate({ content: input, postId: postId});
    };

    

    return (
        <div className="flex flex-col gap-4">
            <form 
            onSubmit={handleCommentSubmit}
            className="flex flex-col gap-2 p-2">
                <div className="flex gap-2 items-center">
                    {session.data?.user.image ? <AvatarSmaller src={session.data?.user.image} username={session.data?.user.name} /> : <SkeletonCircle size='10' />}
                    {session.data?.user.image ? <span className="text-gray-300 text-xs">@{session.data?.user.name}</span> : <SkeletonCircle size='10' />}
                </div>

                <Textarea 
                value = {input}
                size='sm'
                onChange={e => {setInput(e.currentTarget.value)}}
                className="flex-grow resize-none bg-transparent rounded-sm p-2 overflow-auto outline-none"  
                placeholder='Comment...' />

                <CustomButton 
                gray={true}
                type="submit"
                small={true}
                className="self-end bg-[#AE445A]">Comment</CustomButton> 
            </form>

            {error && <Alert mb={4} mt={1} status='error'>
                <AlertIcon />
                Looks like we could not post your comment, please try again later.
            </Alert>}

            <div>{comments?.length} comments</div>

            <div className="flex flex-col gap-4">
                {isLoading || !comments || loading ?  <CommentSkeletonLoader />
                    : 
                    comments && comments.length > 0 && (
                        comments.map((comment) => (!comment.parentCommentId && 
                            <CommentDisplayBox key={comment.id} comment={comment} comments={comments} />
                        ))
                    )}
            </div>
        </div>
    )
}