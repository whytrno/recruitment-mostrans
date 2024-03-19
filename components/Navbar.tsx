'use client'

import {Icon} from "@iconify-icon/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {DetailCharacterInterface} from "@/utils/interfaces";
import {addCharacterToLocation, getAllLocations, getCharacterLocation} from "@/utils/firebase";

const Navbar = (data: DetailCharacterInterface) => {
    const [assignModal, setAssignModal] = useState(false)
    const [locationInput, setLocationInput] = useState('')
    const [locations, setLocations] = useState<string[]>([])
    const [errorMessage, setErrorMessage] = useState('')
    const [characterLocation, setCharacterLocation] = useState('')

    const fetchLocations = async () => {
        const locations = await getAllLocations()
        setLocations(locations)
    }

    const getCharacterLocationData = async () => {
        const location = await getCharacterLocation(data)
        setCharacterLocation(location)
    }

    useEffect(() => {
        fetchLocations()
        getCharacterLocationData()
    }, [])

    const handleAssignLocation = () => {
        const trimmedLocation = locationInput.trim();

        if (trimmedLocation === '') {
            setErrorMessage('Lokasi tidak boleh kosong')
        } else {
            addCharacterToLocation(locationInput, data).catch((e) => console.error(e)).then(() => {
                fetchLocations()
                getCharacterLocationData()
                setErrorMessage('Character berhasil dimasukan kedalam lokasi.')
                const timer = setTimeout(() => {
                    setErrorMessage('')
                }, 2000)
                return () => clearTimeout(timer)
            })
            setLocationInput('');
        }
    }

    return (
        <div className="grid grid-cols-3 justify-between w-full">
            <Link href={'/'} className="flex gap-2 font-bold">
                <Icon icon="mdi:chevron-left" className="text-2xl"/>
                <p>Home</p>
            </Link>

            <p className="text-center">{characterLocation ? `Location: ${characterLocation}` : ''}</p>

            <div className="flex justify-end">
                <div className="relative">
                    <button onClick={() => setAssignModal(!assignModal)}
                            className="w-min whitespace-nowrap bg-blue-400 rounded-xl py-2 px-4 text-white">Assign
                        Location
                    </button>
                    {
                        assignModal && (
                            <div className="absolute top-14 right-0 w-96 border shadow-xl rounded-xl p-3 z-50 space-y-5">
                                <div className="space-y-2">
                                    <input
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setLocationInput(e.target.value)}
                                        value={locationInput}
                                        type="text"
                                        className="w-full rounded-xl py-2 px-4 border"
                                        placeholder="Masukkan lokasi"
                                    />
                                    <button onClick={() => handleAssignLocation()}
                                            className="w-full bg-blue-400 rounded-xl py-2 px-4 text-white">Simpan
                                    </button>
                                    {
                                        errorMessage && (
                                            <p className="text-center text-red-500">{errorMessage}</p>
                                        )
                                    }
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-center">Atau simpan kedalam lokasi yang sudah ada</h2>
                                    {
                                        locations.map((item, index) => (
                                            <button onClick={
                                                () => {
                                                    setLocationInput(item)
                                                    handleAssignLocation()
                                                }
                                            } key={index}
                                                    className="w-full bg-green-400 rounded-xl py-2 px-4 text-white">{item}</button>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar