import { AppIcon } from './AppIcon'
import { Link } from '../modules/sns'

interface Props {
    links: Link[]
}

export const AppFooter = (props: Props) => {
    return (
        <div className="2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4 my-8 py-8 text-gray-400">
            <div className="flex flex-row justify-center items-center">
                {props.links.map(({ link, icon }, i) => link && (
                    <a
                        key={`footer-sns-links-${i}`}
                        href={link}
                        className="mr-2"
                    >
                        <AppIcon
                            size={24}
                            className="inline"
                        >
                            {icon}
                        </AppIcon>
                    </a>
                ))}
            </div>
        </div>
    )
}
