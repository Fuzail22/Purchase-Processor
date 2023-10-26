# Purchase-Processor
Live: https://fuzail22.github.io/Purchase-Processor/

Watch demo here: https://drive.google.com/file/d/1UTVhOGWQ82cMIp3gogaPXKGYlAbAx56V/view?usp=drive_link

- A web app that processes uploaded xlsx/csv file and performs the following operations,
  1. Fill all empty cells with top-level cell values.
  2. Finds the three columns-PO Number, Supplier and Description.
  3. Extract the values from those three columns.
  4. Stores it in easily accessible format in the database.
- Provides a docket creator.
- A real-time drop-down for suppliers and Purchase orders based on the PO file uploaded.
- Download option to download the created dockets as CSV.

## Easily configurable features
- For now, the old suppliers information gets removed for every new file upload, this can be simply changed to remember all suppliers information of the past.
- Table Virtualization can be done when dealing with a larger number of dockets.

## Easily configurable UX
- Acknowledgment popup for every action performed.
- For now, errors and correction information are displayed in the console, it can modified to show on-screen for layman.

## Future Enhancements
- A fresh set of dockets can be created. 
- More than one docket file that can be managed at a time.
- Edit and delete individual dockets.
- Delete all dockets.
