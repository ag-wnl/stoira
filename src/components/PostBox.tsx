import { Box, ModalBody, Modal, ModalCloseButton, ModalHeader, ModalOverlay, ModalContent, ModalFooter, Button, useDisclosure } from '@chakra-ui/react'
import Avatar from './Avatar'
import CustomButton, { ToolTipButton } from './CustomButton'
import CommentBox from './CommentBox'
import { useRef, useState } from 'react'
import { ChatIcon } from '@chakra-ui/icons'

export type postType = {
    post: {
        id: number;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        createdBy: {
            name: string | null;
            image: string | null;
        };
        title: string;
        createdById: string;
    }
};

export function PostBox({post} : postType) {
    const [comment, setComment] = useState<boolean>(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const finalRef = useRef(null)

    return (
      <div>
        <Box
          onClick={onOpen}
          key={post.id}
          borderRadius="lg"
          borderWidth="1px"
          className="flex cursor-pointer transition-colors ease-in-out flex-col gap-2 p-2 md:gap-6 md:p-4 hover:bg-[#140f19]">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <Avatar
                src={post.createdBy.image}
                username={post.createdBy.name}
              />
              <span className="text-sm text-gray-300">
                @{post.createdBy.name}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-300 md:text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
          </div>

          <div>
            <span className="text-md font-bold md:text-lg">{post.title}</span>
          </div>
          <div>
            <span className="text-xs text-gray-100 md:text-sm ">
              {post.name}
            </span>
          </div>
          <ToolTipButton
            onClick={(e) => setComment(!comment)}
            className="self-start">
            <ChatIcon />
          </ToolTipButton>
        </Box>

        {/* When clicked on post, this is the complete overlay :  */}
        <Modal
          finalFocusRef={finalRef}
          size={"6xl"}
          isOpen={isOpen}
          motionPreset='slideInBottom'
          onClose={onClose}
        >
          <ModalOverlay
           bg='blackAlpha.300'
           backdropFilter='blur(4px) hue-rotate(10deg)'
          />
          <ModalContent className='flex flex-col'>
            <ModalHeader className='bg-[#4C3575] border-b border-gray-400'>
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
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className='flex flex-col gap-4 bg-[#060606]'>
              <div className='mt-5'>
                <span className="text-md font-bold md:text-lg">
                  {post.title}
                </span>
              </div>
              <div className='mb-5'>
                <span className="text-xs text-gray-100 md:text-sm ">
                  {post.name}
                </span>
              </div>

              <CommentBox postId={post.id} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
}