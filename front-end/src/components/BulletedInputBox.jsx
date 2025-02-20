import '../App.css';


export function BulletedInputBox ({placeholderText, data}) {

    return(
        <ul placeholder={placeholderText} contentEditable="true" className="h-auto w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 multiLineInput">
            {data ? <li>{data}</li> : <li>{placeholderText}</li>}
        </ul>
    );

};