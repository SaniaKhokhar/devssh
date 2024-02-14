import "./Button.css"

export default function Button(props) {
    return (
      <button
        {...props}
        disabled={props.disabled}
        
        className={'flex bg-blue-500 items-center gap-2 px-4 py-1 rounded-md text-white text-opacity-90' + 
        (props.primary ? 'bg-blue-500 text-white' : 'text-gray-600') +
        (props.disabled  ? 'text-opacity-70 bg-opacity-70 cursor-not-allowed' : '') 
        }/>
      
    );
  }
  