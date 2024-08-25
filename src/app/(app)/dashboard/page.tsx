"use client";
import React, { useEffect, useReducer } from "react";
import axios from "axios";
import FeedBox from "@/components/card";
import SkeletonBox from "@/components/skeletonBox";
import { toast } from "@/components/ui/use-toast";
import NoFeedsMessage from "@/components/NoFeedsMessage";
import RefreshButton from "@/components/refresh-button"


const initialState = {
  data: [],
  loading: true,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case "REMOVE_FEEDS":
      return {
        ...state,
        data: state.data.filter(feed => feed._id !== action.payload)
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

const fetchFeeds = async dispatch => {
  try {
    const response = await axios.get("/api/get-messages");
    dispatch({ type: "FETCH_SUCCESS", payload: response.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FETCH_ERROR", payload: error.response.data.message || "some error occured" });
  }
};

const Page = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const refreshFeeds = async () => {
    dispatch({ type: "SET_LOADING" });
    await fetchFeeds(dispatch);
    toast({
      title: "Feeds Refreshed",
      description: "The feed data has been successfully refreshed.",
      status: "success"
    });
  };

  const updateState = id => {
    dispatch({ type: "REMOVE_FEEDS", payload: id });
  };

  useEffect(() => {
    fetchFeeds(dispatch);
  }, []);

  if (state.loading) {
    return (
      <div className="flex justify-center flex-wrap mt-5 pb-10 w-full max-w-[900px] mx-auto  p-3 ">
    <RefreshButton onRefresh={refreshFeeds} loading={state.loading}/>
        <SkeletonBox />
        <SkeletonBox />
        <SkeletonBox />
        <SkeletonBox />
      </div>
    );
  }

  if (state.error) {
    return <p>Error: {state.error}</p>;
  }

  return (
   <>
    <div className="flex justify-center flex-wrap mt-5 pb-10 w-full max-w-[900px] mx-auto  p-3 ">
        <RefreshButton onRefresh={refreshFeeds} loading={state.loading}/>
      {state.data.length === 0 ? (
        <NoFeedsMessage />
      ) : (
        state.data.map((feed, index) => (
          <FeedBox
            key={feed._id}
            id={feed._id}
            title={feed.title}
            content={feed.content}
            updatedAt={feed.updatedAt}
            onRemove={id => updateState(id)}
          />
        ))
      )}
    </div>
   </>
  );
};

export default Page;
