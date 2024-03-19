'use client'

import Image from 'next/image';
import {DetailCharacterInterface} from "@/utils/interfaces";
import {GET_DETAIL_CHARACTER} from "@/utils/graphqlQueries";
import {useSuspenseQuery} from "@apollo/experimental-nextjs-app-support/ssr";
import Navbar from "@/components/Navbar";

const DetailPage = ({params}: { params: { id: number } }) => {
    const {error, data} = useSuspenseQuery<DetailCharacterInterface>(GET_DETAIL_CHARACTER, {
        variables: {
            id: params.id
        }
    });

    return (
        <div className="space-y-5 lg:space-y-10">
            <Navbar {...data}/>

            <div className="relative h-80 md:h-96 w-full">
                <Image src={data.character.image} alt="Random Image" fill
                       className="object-cover md:object-contain rounded-xl"/>
            </div>
            <div className='lg:col-span-2 space-y-5'>
                <div>
                    <p><span className='font-bold'>Name:</span> {data.character.name} ({data.character.gender})</p>
                    <p><span className='font-bold'>Status:</span> {data.character.status}</p>
                    <p><span className='font-bold'>Species:</span> {data.character.species}</p>
                    <p><span
                        className='font-bold'>Origin:</span> {data.character.origin.type} - {data.character.origin.name}
                    </p>
                    <p><span
                        className='font-bold'>Location:</span> {data.character.location.type} - {data.character.location.name}
                    </p>
                </div>

                <div>
                    <h1 className='font-bold'>Episode:</h1>
                    <div className="overflow-scroll h-96">
                        <ul className='list-decimal list-inside'>
                            {
                                data.character.episode.map((item, index) => (
                                    <li key={index}>
                                        {item.episode} - {item.name}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage