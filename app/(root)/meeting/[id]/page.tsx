'use client'

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

const MeetingPage = ({ params: { id } }: { params: { id: string }}) => {
  const { user, isLoaded } = useUser();
  const [isSetComplete, setIsSetComplete] = useState(false); 
  const { call, isCallLoading } = useGetCallById(id);

  if(!isLoaded || isCallLoading) return <Loader />

  return (
    <main className=" h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetComplete ? (
            <MeetingSetup setIsSetComplete={setIsSetComplete}/>
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage