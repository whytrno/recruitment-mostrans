'use client'

import CharacterList from "../components/CharacterList"
import {useSuspenseQuery} from "@apollo/experimental-nextjs-app-support/ssr";
import {GET_CHARACTERS} from "../utils/graphqlQueries";
import {CharactersInterface} from "@/utils/interfaces";
import Link from "next/link";

const HomePage = () => {
    const {error, data} = useSuspenseQuery<CharactersInterface>(GET_CHARACTERS);

    return (
        <div className='space-y-10'>
            <div className="flex justify-center">
                <Link href={'/character-by-locations'}
                      className="w-min whitespace-nowrap bg-blue-400 rounded-xl py-2 px-4 text-white">
                    Character by Location
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14">
                {
                    data.characters.results.map((item, index) => <CharacterList {...item} key={index}/>)
                }
            </div>
        </div>
    )
}

export default HomePage