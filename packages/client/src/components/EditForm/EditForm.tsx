import clsx from 'clsx';

function EditForm() {
  return (
    <div className="flex items-center flex-col justify-center shadow w-full opacity-50">
      <div
        className="bg-stone-700 text-white text-opacity-90 w-full hover:cursor-pointer hover:bg-stone-900 transition-colors"
        //    onClick={handleAddAccordian}
      >
        <div className="flex justify-between items-center p-2">
          <span>edit faction</span>
          <span
            className={clsx(
              'text-base' //isOpen && 'rotate-180'
            )}
          >
            &#x25BC;
          </span>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
