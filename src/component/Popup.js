import {useEffect} from 'react' ;
function Popup(props) {

    useEffect(function(){
        console.log(props.searchApiHandler.bind(this,'coding')());
      },[]); 
  return (
    <div className="bg-white absolute w-52 h-64 shadow-md shadow-gray-400 top-10 z-30">
      <div className="bg-white absolute w-5 h-5 -top-2 left-4 rotate-45 -z-10"></div>
      <input
        type="search"
        onChange={props.searchSetter.bind(this)}
        onKeyDown={props.keyDownHandler.bind(this)}
        onKeyUp={()=>console.log(this)}
        className="m-2 w-48 border outline-none rounded-md"
        value={props.search }
        placeholder="search Gifs"
      />
      <div className="flex flex-col p-1 w-auto h-52 overflow-auto gap-y-2 z-50">
        {props.searchRes.map((searchres, index) => {
          return (
            <img
              onClick={props.selectedImgHandler.bind(
                this,
                searchres.images.original.webp
              )}
              key={new Date().getMilliseconds() + " " + index + searchres.slug}
              src={searchres.images.original.webp}
              className="border-2 w-96 h-80 cursor-pointer"
              alt="Gif could not loaded"
            />
          );
        })}
      </div> 
    </div>
  );
}

export default Popup;
