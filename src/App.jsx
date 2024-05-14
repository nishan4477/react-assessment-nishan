import axios from "axios";
import "./App.css";
import { Album, Photo } from "./components";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const DUMMY_DATA = [
  {
    albumId: 1,
    id: 1,
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952",
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
  },
  {
    albumId: 1,
    id: 2,
    title: "reprehenderit est deserunt velit ipsam",
    url: "https://via.placeholder.com/600/771796",
    thumbnailUrl: "https://via.placeholder.com/150/771796",
  },
];

function App() {
  const [albumId, setAlbumId] = useState();
  // you can make use of the following to get the base url
  // console.log(import.meta.env.VITE_BASE_URL);
  const {
    data: albumList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: async () =>
      await axios.get(`${import.meta.env.VITE_BASE_URL}/albums`),
  });

  const {
    data: albumData,
    isLoading: albumLoading,
    isError: albumIsError,
    error: albumError,
  } = useQuery({
    queryKey: ["albumsDetail", albumId],
    queryFn: async () =>
      await axios.get(
        `${import.meta.env.VITE_BASE_URL}/albums/${albumId}/photos`
      ),
    enabled: !!albumId,
  });

  return (
    <div className="container">
      <div className="flex gap-4">
        <div className="lg:basis-[40%]">
          <h1 className="pb-4 border-b-2 mb-4 sticky">Albums</h1>

          <div className="flex flex-col gap-2 h-screen overflow-y-auto pr-2">
            {/* Get Album data from https://jsonplaceholder.typicode.com/albums */}
            {isLoading ? (
              <p className="text-base font-medium text-white">
                Data is fetching....
              </p>
            ) : (
              albumList?.data?.length > 0 &&
              albumList?.data?.map((item, index) => (
                <div onClick={() => setAlbumId(item?.id)} key={index}>
                  <Album data={item} />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex-1">
          <h1 className="pb-4 border-b-2 mb-4">Photos</h1>

          <div className="grid grid-cols-4 gap-4 h-screen overflow-y-auto">
            {/* Only show this initially */}

            {!albumId && (
              <p className="col-span-4 text-gray-500">
                Click on an album to start viewing photos.
              </p>
            )}

            {albumLoading && (
              <p className="text-base font-medium text-white col-span-4 flex justify-center items-center ">
                Data is fetching please wait....
              </p>
            )}

            {albumData?.data?.length > 0 &&
              albumData?.data?.map((photo, index) => (
                <Photo {...photo} key={index} />
              ))}

            {!albumData?.data?.length &&
              !albumLoading &&
              !albumIsError &&
              albumId && (
                <p className="text-base font-medium text-white col-span-4 flex justify-center items-center">
                  No photos found in this album
                </p>
              )}

            {!albumLoading && albumIsError && (
              <p className="text-base font-medium text-white col-span-4 flex justify-center items-center">
                Something went wrong...
              </p>
            )}
          </div>
        </div>
      </div>
      {/* <div className="flex">
        <img src="/vite.svg" className="v__logo" alt="Vite logo" />
        <img src={reactLogo} className="v__logo react" alt="React logo" />
      </div> */}
    </div>
  );
}

export default App;
