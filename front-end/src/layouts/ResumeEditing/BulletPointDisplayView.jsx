export function BulletPointDisplayView({text, placeHolder}) {
    return text == '' ? (
        <p className="list-disc items-center rounded-md border px-3 py-1text-sm shadow-sm">
            {placeHolder}
        </p>
    ) : (
        <ul className="list-disc items-center rounded-md border px-3 py-1 text-sm shadow-sm">
            {text.split('\n').map((item, index) => (
                <li key={index} className="times w-full">
                    {item}
                </li>
            ))}
        </ul>
    );
}
