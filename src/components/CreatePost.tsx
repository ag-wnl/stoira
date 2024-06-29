import { useSession } from "next-auth/react";
import Avatar from "./Avatar";
import CustomButton from "./CustomButton";
import { type FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { Input, SkeletonCircle } from '@chakra-ui/react'

export default function CreatePost() {
    const session = useSession();
    const [postInput, setPostInput] = useState("");
    const [postTitle, setPostTitle] = useState("");
    
    const createPost = api.post.create.useMutation({
        onSuccess: () => {setPostInput(""); setPostTitle("");},
        onError: (err) => {console.error("Error in posting - ", err)}
    })

    const handlePostSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (postInput.trim().length === 0 || postTitle.trim().length === 0) {
            return;
        }
        createPost.mutate({ name: postInput, title: postTitle });
    };

    return (
        <form 
        onSubmit={handlePostSubmit}
        className="flex flex-col gap-2 border-b p-2">
            <div className="flex gap-4">
                {session.data?.user.image ? <Avatar src={session.data?.user.image} username={session.data?.user.name} /> : <SkeletonCircle size='10' />}
                <Input 
                value={postTitle}
                onChange={e => {setPostTitle(e.currentTarget.value)}}
                focusBorderColor='blue' variant='flushed' 
                placeholder='Post Title...' />
            </div>

            <textarea
                value = {postInput}
                onChange={e => {setPostInput(e.currentTarget.value)}}
                className="flex-grow resize-none bg-transparent rounded-sm p-2 text-md overflow-auto outline-none"
                placeholder="What's up?"
                />

            <CustomButton 
            type="submit"
            small={true}
            className="self-end">Post</CustomButton>
        </form>
    )
}