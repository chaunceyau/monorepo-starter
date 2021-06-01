import React from 'react'

export function H1(props) {
    return (
        <h1 className="text-xl">{props.children}</h1>
    )
}

export function H2(props) {
    return (
        <h2 className={`text-lg leading-6 font-medium text-gray-900 tracking-wide ${props.className}`}>{props.children}</h2>
    )
}

export function H3(props) {
    return (
        <h3 className="">{props.children}</h3>
    )
}

export function H4(props) {
    return (
        <h4 className="text-xl">{props.children}</h4>
    )
}

export function H5(props) {
    return (
        <h5 className="text-xl">{props.children}</h5>
    )
}

export function H6(props) {
    return (
        <h6 className="text-xl">{props.children}</h6>
    )
}