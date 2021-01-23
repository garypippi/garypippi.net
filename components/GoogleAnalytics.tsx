import { NextRouter as Router } from 'next/router'

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
export type GtagFnOr<T> = GtagFn|T

export declare var gtag: GtagFnOr<undefined>
export const getGtagFn = (): GtagFnOr<false>  => typeof gtag == 'function' && gtag
export const routeEvent = 'routeChangeComplete'

export const createOnRouteChangeComplete = (gtagFn = getGtagFn()) => gtagFn && ((path: string) => {
    const e = document.querySelector(`script.${idMarker}`)
    if (e && e.textContent) {
        gtagFn('config', e.textContent, {
            page_path: path
        })
    }
})

export const useGtag = (router: Router, onRouteChangeComplete = createOnRouteChangeComplete()) => {
    return onRouteChangeComplete && (() => {
        router.events.on(routeEvent, onRouteChangeComplete)
        return () => router.events.off(routeEvent, onRouteChangeComplete)
    })
}
