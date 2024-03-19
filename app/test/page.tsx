'use client'

import {useEffect, useState} from "react";
import CharacterList from "../../components/CharacterList";
import {Icon} from "@iconify-icon/react";
import Link from "next/link";
import {getAllLocations, getCharactersFromLocation} from "@/utils/firebase";

const CharacterByLocationsPage = () => {
    const [locations, setLocations] = useState<string[]>([]);
    const [selectLocation, setSelectLocation] = useState<string>('');
    const [data, setData] = useState<any[]>([]);

    const fetchLocations = async () => {
        await getAllLocations().then(
            (locationsFetch) => setLocations(locationsFetch)
        );
    }

    const fetchCharactersByLocation = async () => {
        // @ts-ignore
        if (selectLocation !== '' || selectLocation !== 'Select locations') {
            const characters = await getCharactersFromLocation(selectLocation);
            setData(characters);
        }
    }

    useEffect(() => {
        fetchLocations();
    }, []);

    useEffect(() => {
        fetchCharactersByLocation();
    }, [selectLocation]);

    return (
        <div className="space-y-10">
            <Link href={'/'} className="flex gap-2 font-bold">
                <Icon icon="mdi:chevron-left" className="text-2xl"/>
                <p>Home</p>
            </Link>

            <select onChange={(e) => setSelectLocation(e.target.value)}
                    className="w-full py-2 text-center rounded-xl shadow-xl border px-4">
                <option>Select locations</option>
                {
                    locations.map((item, index) => (
                        <option key={index}>
                            {item}
                        </option>
                    ))
                }
            </select>

            {
                data.length > 0 && (
                    <div className='space-y-10'>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-14">
                            {
                                data.map((item, index) => <CharacterList {...item.character} key={index}/>)
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export default CharacterByLocationsPage;
