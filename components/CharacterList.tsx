import Image from "next/image"
import Link from "next/link";

interface CharacterListProps {
    id: number;
    name: string;
    image: string;
}

const CharacterList = ({id, name, image}: CharacterListProps) => {
    return (
        <Link href={`detail/${id}`}
              className="w-full h-80 md:h-96 relative rounded-xl cursor-pointer group">
            <Image src={image} alt={name} fill className="object-cover rounded-xl"/>
            <div className="absolute bottom-0 backdrop-brightness-50 text-white py-2 w-full rounded-b-xl">
                <p className="text-center">{name}</p>
            </div>
            <div
                className="group-hover:flex transition-all hidden absolute top-0 left-0 backdrop-brightness-50 text-white py-2 w-full h-full items-center justify-center rounded-xl">
                <p>Show Detail</p>
            </div>
        </Link>
    )
}

export default CharacterList