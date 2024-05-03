import { AiOutlineCloudUpload } from "react-icons/ai";
import Link from "next/link";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Menu, Popover } from "@headlessui/react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import useDebounce from "../hooks/useDebounce";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { PlusSmIcon, SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  DocumentIcon,
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import { mintNFTABI, mintNFTAddress } from "../contracts/Contract";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const navigation = [
  {
    name: "Marketplace",
    href: "/Tutorials",
    icon: UserGroupIcon,
    current: true,
  },
  { name: "Blog", href: "/Blog", icon: DocumentIcon, current: false },
  { name: "Media", href: "/Content", icon: HomeIcon, current: false },
];

const communities = [
  { name: "Subscription", href: "/Subscribe", current: false },
  { name: "UnSubcription", href: "/Unsubscribe", current: false },
];
const explore = [
  {
    name: "Product",
    href: "#",
  },
];
const tabs = [
  { name: "Recent", href: "#", current: true },
  { name: "Most Liked", href: "#", current: false },
  { name: "Most Answers", href: "#", current: false },
];

const whoToFollow = [
  {
    name: "ThePhoenixGuild",
    handle: "PhoenixGuildHQ",
    href: "#",
    imageUrl:
      "https://pbs.twimg.com/profile_images/1564689303795814400/6XAwK3Oz_400x400.jpg",
  },
  {
    name: "Gryffindors",
    handle: "Gryffindors",
    href: "",
    imageUrl:
      "https://www.hp-lexicon.org/wp-content/uploads/2015/08/gryffindor-shield.jpg",
  },
];

const products = [
  {
    id: 1,
    name: "Biconomy meta & crosschain transactions",
    color: "Learn with the Biconomy and have experience with the Biconomy",
    href: "#",
    imageSrc: "https://i.ytimg.com/vi/ncw37ZY8IEY/maxresdefault.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$10",
    owned: true,
  },
  {
    id: 2,
    name: "What is Biconomy",
    color: "Learn with the Biconomy and have experience with the Biconomy",
    href: "#",
    imageSrc: "https://i.ytimg.com/vi/7xXP5C_H_z0/maxresdefault.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$10",
    owned: false,
  },
  {
    id: 3,
    name: "IPFS Hands-on Tutorial",
    color: "Learn with the IPFS and have experience with the IPFS",
    href: "#",
    imageSrc: "https://i.ytimg.com/vi/KIEq2FyMczs/maxresdefault.jpg",
    imageAlt:
      "In this video we move on from theory to practice. I’ll be going over some IPFS commands in the command line interface, to gain a deeper understanding of how",
    price: "$10",
    owned: false,
  },
  {
    id: 4,
    name: "IPFS + Ethereum",
    color: "Learn with the IPFS and have experience with the IPFS",
    href: "#",
    imageSrc: "https://i.ytimg.com/vi/SkMH0WeRYtg/maxresdefault.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$10",
    owned: false,
  },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const buttonclick = () => {
    console.log("Is Session Enabled true ");
    console.log("Send Msg from NFT Media");
    console.log(
      "The Transaction has been signed with 0x0Ba3f9705314d145885BDdCaDB90f98BBD6C4BF1"
    );
  };

  function createVariables() {
    var tokenId = [];
    var arrayLength = products.length;
    for (var i = 0; i < arrayLength; i++) {
      tokenId[i] = products[i].imageSrc;
    }

    return tokenId;
  }

  const debouncedValue = useDebounce<string>(createVariables());
  const { data: session } = useSession();

  //Preparing a contract
  const { config } = usePrepareContractWrite({
    address: mintNFTAddress,
    abi: mintNFTABI,
    functionName: "safeMint",
    //@ts-ignore

    enabled: Boolean(debouncedValue),
  });

  //using prepared contract
  const {
    write: mintNFT,
    data: mintData,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite(config);

  //waiting for the transaction to finish

  const { isSuccess: txSuccess, isLoading } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  const isMinted = txSuccess;
  const [uploadCount, setUploadCount] = useState(0);

  const handleFileChange = (event) => {
    event.preventDefault();

    if (uploadCount === 0) {
      toast.info("Warning: The image is 18+");
    } else {
      toast.success("The image is safe!");
    }
    setUploadCount(uploadCount + 1);
  };

  return (
    <>
      <Head>
        <title>NFT Media</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-full">
        <Popover
          as="header"
          className={({ open }) =>
            classNames(
              open ? "fixed inset-0 z-40 overflow-y-auto" : "",
              "bg-white shadow-sm lg:static lg:overflow-y-visible"
            )
          }
        >
          {({ open }) => (
            <div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-6">
                  <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                    <div className="flex-shrink-0 flex items-center">
                      <Link href="/">
                        <h1 className="text-2xl font-bold">NFT Media</h1>
                      </Link>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                    <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                      <div className="w-full">
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                        <div className="relative">
                          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                            <SearchIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="search"
                            name="search"
                            className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
                            placeholder="Search"
                            type="search"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t justify-center border-gray-200 pt-4  ">
                    <div className="max-w-3xl mx-auto  flex items-center sm:px-6">
                      <div className="flex-shrink-0 px-5">
                        <ConnectButton />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Popover.Button>
                  </div>
                  <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                    {/* Profile dropdown */}
                    <Menu as="div" className="flex-shrink-0 relative ml-6">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                          <span className="sr-only">Open user menu</span>
                        </Menu.Button>
                      </div>
                    </Menu>{" "}
                    {}
                  </div>
                </div>
              </div>

              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-100 text-gray-900"
                          : "hover:bg-gray-50",
                        "block rounded-md py-2 px-3 text-base font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700"
                  >
                    New Post
                  </a>

                  <div className="mt-6 flex justify-center">
                    <Link
                      href="/Blog"
                      className="text-base font-medium text-gray-900 hover:underline"
                    >
                      Blogs
                    </Link>
                  </div>
                </div>
              </Popover.Panel>
            </div>
          )}
        </Popover>

        <div>
          <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-5">
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
              <nav
                aria-label="Sidebar"
                className="sticky top-4 divide-y divide-gray-300"
              >
                <div className="pb-8 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-200 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50",
                        "group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="pt-10">
                  <p
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="communities-headline"
                  >
                    My Subscription
                  </p>
                  <div
                    className="mt-3 space-y-2"
                    aria-labelledby="communities-headline"
                  >
                    {communities.map((community) => (
                      <Link
                        key={community.name}
                        href={community.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">{community.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="pt-10">
                  <p
                    className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    id="communities-headline"
                  >
                    Explore
                  </p>
                  <div
                    className="mt-3  space-y-2"
                    aria-labelledby="communities-headline"
                  >
                    {explore.map((community) => (
                      <Link
                        key={community.name}
                        href={community.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">{community.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
            <main className="lg:col-span-9 xl:col-span-6">
              <div className="bg-white">
                <div className="max-w-2xl mx-auto ">
                  <h2 className="text-xl font-bold text-gray-900">
                    Mint your NFT Media
                  </h2>

                  <div className="mt-8 px-15 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-2 xl:gap-x-8">
                    {products.map((product) => (
                      <div key={product.id}>
                        <div className="relative">
                          <div className="relative w-full h-72 rounded-lg overflow-hidden">
                            <img
                              src={product.imageSrc}
                              alt={product.imageAlt}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="relative mt-4">
                            <h3 className="text-sm font-medium text-gray-900">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                            <div
                              aria-hidden="true"
                              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                            />
                            <p className="relative text-lg font-semibold text-white">
                              {product.price}
                            </p>
                          </div>
                        </div>
                        <div className="mt-6">
                          {product.owned ? (
                            <a href={product.href} className="btn-grad1">
                              Sold
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          ) : (
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                mintNFT?.();
                              }}
                            >
                              {!session && (
                                <button
                                  className="btn-grad3"
                                  disabled={isMintLoading || isLoading}
                                  type="submit"
                                >
                                  {isMintLoading && "Waiting For Approve"}
                                  {isMintStarted &&
                                    isLoading &&
                                    !isMinted &&
                                    "Minting..."}
                                  {!isMintLoading &&
                                    !isLoading &&
                                    "Mint an NFT Media "}
                                  {isMinted && "Minted Successfully"}
                                </button>
                              )}
                            </form>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
            <aside className="hidden xl:block xl:col-span-4">
              <div className="sticky top-4 space-y-4">
                <section aria-labelledby="who-to-follow-heading">
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <h2
                        id="who-to-follow-heading"
                        className="text-base font-medium text-gray-900"
                      >
                        Suggested for you
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul
                          role="list"
                          className="-my-4 divide-y divide-gray-200"
                        >
                          {whoToFollow.map((user) => (
                            <li
                              key={user.handle}
                              className="flex items-center py-4 space-x-3"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-gray-900">
                                  <a href={user.href}>{user.name}</a>
                                </p>
                                <p className="text-sm text-gray-500">
                                  <a href={user.href}>{"@" + user.handle}</a>
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                                >
                                  <PlusSmIcon
                                    className="-ml-1 mr-0.5 h-5 w-5 text-rose-400"
                                    aria-hidden="true"
                                  />
                                  <span>Follow</span>
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
                <div className="flex justify-center px-8 py-2 bg-rose-500 rounded-lg shadow">
                  <a
                    href="#"
                    className="text-sm font-medium pt-1 text-gray-900 hover:underline"
                  >
                    Go Premium
                  </a>
                  <a
                    href="#"
                    className="ml-5 flex-shrink-0 bg-rose-500  border-black rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-black"
                  >
                    <Popup
                      trigger={<AiOutlineCloudUpload className="h-6 w-6" />}
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="modal">
                          <button className="close" onClick={close}>
                            &times;
                          </button>
                          <div className="header">Upload Post </div>
                          <div className="content">
                            <form action="#" method="POST">
                              <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                  <div className="grid grid-cols-3 gap-6">
                                    <div className="col-span-3">
                                      <label className="block text-sm font-medium text-gray-700">
                                        Upload photo
                                      </label>
                                      <div className="mt-1 border-2 border-gray-300 border-dashed rounded-md px-6 pt-5 pb-6 flex justify-center">
                                        <div className="space-y-1 text-center">
                                          <svg
                                            className="mx-auto h-12 w-12 text-gray-400"
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                          >
                                            <path
                                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                              strokeWidth={2}
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <div className="flex text-sm text-gray-600">
                                            <label
                                              htmlFor="file-upload"
                                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                              <span>Upload a file</span>
                                              <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                className="sr-only"
                                                onChange={handleFileChange}
                                              />
                                            </label>
                                            <p className="pl-1">
                                              or drag and drop
                                            </p>
                                          </div>
                                          <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF up to 5MB
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-3">
                                    <label
                                      htmlFor="about"
                                      className="block text-sm font-medium text-gray-700"
                                    >
                                      Description
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                        placeholder=""
                                        defaultValue={""}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="actions">
                            <button onClick={()=>{
                              toast.success("Uploaded successfully")
                              setTimeout(()=>{
                                close()
                              }, 1000)
                            }} className=" bg-blue-500 text-sm hover:bg-emerald-400 rounded-xl px-8 py-2">
                              Post
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  </a>
                  <a
                    href="#"
                    className="ml-5 flex-shrink-0 bg-rose-500  border-black rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-black"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </aside>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Home;
