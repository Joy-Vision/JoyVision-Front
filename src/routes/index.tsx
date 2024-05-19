import {
  createEffect,
  createResource,
  createSignal,
  For,
  onMount,
} from 'solid-js';
import {
  createQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/solid-query';

export default function Home() {
  const palyListQuery = createQuery(() => ({
    queryKey: ['paly list'],
    queryFn: () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve([
            {
              id: '1',
              url: './1.mp4',
            },
            {
              id: '2',
              url: './2.mp4',
            },
          ]);
        }, 200);
      }) as Promise<
        {
          id: string;
          url: string;
        }[]
      >,
    staleTime: 1000 * 30, // 5 minutes
    throwOnError: true, // Throw an error if the query fails
  }));

  const [cacheList, setCacheList] = createSignal<
    {
      id: string | number;
      url: string;
    }[]
  >([]);

  if (palyListQuery.data) {
    setCacheList([palyListQuery.data[0], palyListQuery.data[1]]);
  }

  createEffect(() => {
    console.log(cacheList());
  });

  const prev = () => {
    const index = palyListQuery.data!.findIndex(
      item => item.id === cacheList()[0].id
    );
    if (index === 0) {
      setCacheList(source => {
        source.unshift(palyListQuery.data![palyListQuery.data!.length - 1]);
        source.pop();
        return [...source];
      });
      return;
    }
    setCacheList(source => {
      source.unshift(palyListQuery.data![index - 1]);
      source.pop();
      return [...source];
    });
  };

  const next = () => {
    const index = palyListQuery.data!.findIndex(
      item => item.id === cacheList()[1].id
    );
    if (index === palyListQuery.data!.length - 1) {
      console.log('====');
      setCacheList(source => {
        source.shift();
        source.push(palyListQuery.data![0]);
        return [...source];
      });
      return;
    }
    setCacheList(source => {
      console.log('first');
      source.shift();
      source.push(palyListQuery.data![index + 1]);

      return [...source];
    });
  };

  return (
    <div class="w-full h-full flex justify-center items-center">
      <div>
        <For each={cacheList()}>
          {(item, idx) => (
            <video
              src={item.url}
              controls
              width="500"
              autoplay
              classList={{
                hidden: idx() === 0,
              }}
            />
          )}
        </For>
        <div class="mt-5 flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={prev}
          >
            prev
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={next}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
}
