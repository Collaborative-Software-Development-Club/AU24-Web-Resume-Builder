export function BulletPointDisplayView({text, placeHolder}) {
    return text == '' ? (
        <div></div>
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
