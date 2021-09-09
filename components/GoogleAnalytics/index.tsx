import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
    id?: string
}

export const idMarker = 'gaid'

export const GoogleAnalytics = (props: Props) => {
    return ! props.id ? (null) : (
        <>
            <script
                className={idMarker}
                type="text/plain"
            >
                {props.id}
            </script>
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${props.id}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${props.id}');
                    `
                }}
            />
        </>
    )
}


export type GtagFn = ((type: string, id: string, params: {page_path: string}) => void)
export const routeEvent = 'routeChangeComplete'

export const createOnRouteChangeComplete = (gid: string, gtag: GtagFn) => {
    return (path: string) => {
        gtag('config', gid, {
            page_path: path
        })
    }
}

export const useGtag = (gtag?: GtagFn|false) => {
    if (! gtag)
        return
    const e = document.querySelector(`script.${idMarker}`)
    if (e && e.textContent) {
        const { events: { on, off } } = useRouter()
        const onRouteChangeComplete = createOnRouteChangeComplete(e.textContent, gtag)
        useEffect(() => {
            on(routeEvent, onRouteChangeComplete)
            return () => {
                off(routeEvent, onRouteChangeComplete)
            }
        })
    }
}
