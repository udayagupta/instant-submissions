import React, { useState, useEffect } from "react";
import { socket } from "../lib/socket";
import { getSubmissionsByFormId } from "../lib/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const useSubmissions = (formId) => {

    const queryClient = useQueryClient();
    const queryKey = ["submissions", formId];

    const {
        data: submissions = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey,
        queryFn: () => getSubmissionsByFormId(formId),
        enabled: !!formId
    });


    useEffect(() => {
        if (!formId) return;

        const eventName = `new-submission-${formId}`;

        const handleNewSubmissions = (newSubmission) => {
            queryClient.setQueriesData(queryKey, (oldData) => {
                const prevData = oldData || [];
                return [newSubmission, ...prevData];
            })
        }

        socket.on(eventName, handleNewSubmissions);

        return () => {
            socket.off(eventName, handleNewSubmissions);
        }
        
    }, [formId, queryClient, queryKey])


    return { submissions, isLoading, isError, error };
}