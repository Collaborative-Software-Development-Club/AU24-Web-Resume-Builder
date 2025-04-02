export function BulletPointDisplayView({text, placeHolder}) {
    return text == '' ? (
        <ul className="times list-disc items-center px-3 py-1 text-sm">
            <li>{placeHolder}</li>
        </ul>
    ) : (
        <ul className="list-disc items-center px-3 py-1 text-sm">
            {text.split('\n').map((item, index) => (
                <li key={index} className="times w-full">
                    {item}
                </li>
            ))}
        </ul>
    );
}
