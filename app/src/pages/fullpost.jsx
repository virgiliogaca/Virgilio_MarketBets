import { AnchorProvider, Program } from "@project-serum/anchor";
import {
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "src/context/functions/getPostById";
import idl from "src/idl.json";
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, AreaSeries} from 'react-vis';

const PROGRAM_KEY = new PublicKey(idl.metadata.address);

function getProgram(provider) {
  return new Program(idl, PROGRAM_KEY, provider);
}

export const FullPost = () => {
  const { id } = useParams();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    try {
      if (provider) {
        const getPost = async () => {
          const program = getProgram(provider);
          const post = await getPostById(id.toString(), program);
          setPost(post);
        };
        getPost();
      }
    } catch { }
  }, [provider]);

  useEffect(() => {
    if (wallet) {
      const provider = new AnchorProvider(connection, wallet, {});
      setProvider(provider);
    }
  }, [connection, wallet]);
  const data = [
    {x: 0, y: Math.random(9)},
    {x: 1, y: Math.random(6)},
    {x: 2, y: Math.random(5)},
    {x: 3, y: Math.random(10)},
    {x: 4, y: Math.random(2)},
    {x: 5, y: Math.random(8)},
    {x: 6, y: Math.random(9)},
    {x: 7, y: Math.random(4)},
    {x: 8, y: Math.random(3)},
    {x: 9, y: Math.random(1)}
  ];


  return (
    <div className="hentry background-color">
      <div className="flex justify-start featured-image ml-96 -mt-20">
      <img
                src={'https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg'}
                alt="avatar"
                className="w-8 h-8 rounded-full bg-gray-200 shadow ring-2 ring-indigo-400 ring-offset-2 ring-opacity-50"
              />
              <p className=" font-bold text-sm ml-2 capitalize">
                {'Virgilio Garcia'}
              </p>
      </div>
      
      <div className="flex justify-center featured-image">
        <XYPlot height={300} width={800}>
          <AreaSeries data={data} strokeStyle="solid" />
        </XYPlot>
      </div>
      <h1 className="entry-title flex justify-center">{post?.title}</h1>
      
      <div className="flex justify-center -mt-14">
        <p>{post?.content}</p>
      </div>

      <div className="flex justify-center space-x-5 featured-image mt-80">
          <button className=" bg-green-400 h-9 w-36 font-extrabold text-2xl rounded-md text-gray-50">Comprar</button>
          <button className="bg-blue-400 h-9 w-36 font-extrabold text-2xl rounded-md text-gray-50">Vender</button>
          <button className="bg-red-500 h-9 w-36 font-extrabold text-2xl rounded-md text-gray-50">Short</button>
      </div>
    </div>
  );
};
