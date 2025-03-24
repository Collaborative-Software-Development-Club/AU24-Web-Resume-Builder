export function BulletPointDisplayView({text}) {
    return text == '' ? null : (
        <ul className="list-disc list-inside">
            {text.split('\n').map((item, index) => (
                <li key={index} className="times">
                    {item}
                </li>
            ))}
        </ul>
    );
}
