import { AppIcon } from './AppIcon'
import { useSnsLinks } from '../modules/store'

export const AppFooter = () => {
    return (
        <div className="2xl:px-64 xl:px-48 lg:px-16 md:px-8 px-4 my-8 py-8 text-gray-400">
            <div className="flex flex-row justify-center items-center">
                {useSnsLinks().map(({ href, icon }, i) => href && (
                    <a
                        key={`footer-sns-links-${i}`}
                        href={href}
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
