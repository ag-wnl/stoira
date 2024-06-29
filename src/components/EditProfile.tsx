import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
  } from '@chakra-ui/react'
import { useSession } from 'next-auth/react';
import { useState, type FormEvent } from 'react';
import { api } from '~/utils/api';
import CustomButton from './CustomButton';
import { motion } from "framer-motion"
import { UserDataType } from '~/pages/user/[username]';


export default function EditProfile(userData: UserDataType) {
    const session = useSession();

    const [realName, setRealName] = useState<string>("")
    const [about, setAbout] = useState<string>("")
    const [website, setWebsite] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    
    const updateProfile = api.user.updateUser.useMutation({
        onSuccess: () => {
            setLoading(false)
            setSuccess(true)
        },
        onError: (err) => {console.error("Error in posting - ", err)}
    })

    const handleEditProfileSubmit = async () => {
        setLoading(true);
        updateProfile.mutate({realName: realName, about: about, website: website})
    };


    return (
        <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col gap-5 mt-10 mb-10 border-2 ${success ? 'border-green-200' : '' } rounded-md p-4 md:p-10`}>
            <div className='flex justify-between'>
                <span className='text-[1.5rem] font-bold underline decoration-purple-500'>Edit</span>
                <CustomButton onClick={e => handleEditProfileSubmit()} small={true} gray={true}>Save edit</CustomButton>
            </div>
            <div>
                <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input value={userData.userData?.realName ? userData.userData.realName : ''} disabled={loading} onChange={e => setRealName(e.currentTarget.value)} />
                    <FormHelperText>Always nice to have your real name!</FormHelperText>
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <FormLabel>About</FormLabel>
                    <Input value={userData.userData?.about ? userData.userData.about : ''} disabled={loading} onChange={e => setAbout(e.currentTarget.value)} />
                    <FormHelperText>Kinda like the tag-line of your profile, flex it</FormHelperText>
                </FormControl>
            </div>

            <div>
                <FormControl>
                    <FormLabel>Website</FormLabel>
                    <Input value={userData.userData?.website ? userData.userData?.website : ''} disabled={loading} onChange={e => setWebsite(e.currentTarget.value)} />
                    <FormHelperText>Your primary website (portfolio, coding profile, personal project)</FormHelperText>
                </FormControl>
            </div>
        </motion.div>
    )
}