// @refresh reset
import { useEffect, useContext } from "react";
import useSWR, { mutate } from "use-swr";
import { AppContext } from "../authentication/AppProvider";

let base_url = "https://002301f7.ngrok.io/api/v1";
export const root_url = "https://002301f7.ngrok.io";

export const createUrl = (route, query) => {
  const baseUrl = base_url + route;
  return query ? `${baseUrl}/${query}` : baseUrl;
};

const getUrl = (path, query) => createUrl(path, query);

export function usePrefetcher(url) {
  const { fetcher } = useContext(AppContext);
  useEffect(() => {
    fetcher(getUrl("/celebrities", x.slug)).then(dd => {
      mutate(getUrl("/celebrities", x.slug), dd);
    });
  }, []);
}

export function useGetCategories(options = {}) {
  const { fetcher } = useContext(AppContext);
  const { isDependent } = options;
  const url = isDependent ? () => getUrl(`/categories`) : getUrl(`/categories`);

  const { data, ...rest } = useSWR(url, fetcher);

  let result = data || [];
  useEffect(() => {
    if (data) {
      data
        .filter(x => x.count > 0)
        .forEach(x => {
          fetcher(getUrl("/celebrities", x.slug)).then(dd => {
            mutate(getUrl("/celebrities", x.slug), dd);
          });
        });
    }
  }, [result.length]);

  return {
    data,
    hasData: Boolean(data),
    ...rest
  };
}

export function useGetCelebrities(options = {}) {
  const { fetcher } = useContext(AppContext);
  const { isDependent, category } = options;
  const url = isDependent
    ? () => getUrl("/celebrities", category)
    : getUrl("/celebrities", category);

  const { data, ...rest } = useSWR(url, fetcher);

  return {
    data,
    hasData: Boolean(data),
    ...rest
  };
}

export function useGetSeachResults(query) {
  const { fetcher } = useContext(AppContext);
  const url = createUrl("/search", query);

  const { data, ...rest } = useSWR(url, fetcher);

  return {
    data,
    hasData: Boolean(data),
    ...rest
  };
}

export function useGetCeleb(query) {
  const { fetcher } = useContext(AppContext);
  const url = createUrl("/celebrity", query);
  const { data, ...rest } = useSWR(url, fetcher);

  return {
    data,
    hasData: Boolean(data),
    ...rest
  };
}

// {
//   "personal_booking": false,
//   "order_to": "Tunde",
//   "order_from": "Shola",
//   "uuid": "9c45681a-875c-4d85-baad-cf27ffeb9b72",
//   "message": "Its our anniversary",
//   "video": {
//       "uuid_id": "18f774fe-2c11-4817-ae31-13dd9643b393",
//       "image": null,
//       "videofile": null,
//       "status": "P",
//       "timestamp": "2020-01-15T13:06:21.324789Z",
//       "mui_id": null,
//       "youtube_id": null,
//       "recording_url": "https://recordings-eu.addpipe.com/d2f1c9e06f6ce047bc3ddffe535eeb43/gGtGBC0yrkd2fzEXdq1CFnma1hjVS0oD.mp4",
//       "snapshot_url": "https://recordings-eu.addpipe.com/d2f1c9e06f6ce047bc3ddffe535eeb43/gGtGBC0yrkd2fzEXdq1CFnma1hjVS0oD.jpg",
//       "reply": false,
//       "user": null,
//       "parent": null,
//       "liked": []
//   },
//   "accepted": true,
//   "approved": true,
//   "expired": false,
//   "completed": true,
//   "cancelled": false,
//   "declined": false,
//   "order_review": "thanks",
//   "order_rating": 5,
//   "reviewed_at": "2020-01-22T09:57:22.053282Z",
//   "payment_status": "success"
// }
