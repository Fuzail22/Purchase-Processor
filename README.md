# Purchase-Processor
Live: https://fuzail22.github.io/Purchase-Processor/

Watch demo here: https://drive.google.com/file/d/1UTVhOGWQ82cMIp3gogaPXKGYlAbAx56V/view?usp=drive_link

- A web app that processes uploaded xlsx/csv file and performs the following operations,
  1. Fill all empty cells with top level cell values.
  2. Finds the three columns-PO Number, Supplier and Description.
  3. Extract the values from those three columns.
  4. Stores it in easily accessible format in the database.
- Provides a docket creater.
- A real time drop down for supplier and Purchase order based on the file uploaded.
- Download option to download the created dockets as CSV.

## Easily configurable features
- For now the old suppliers information get removed for every new file upload, this can be simply changed to remember all suppliers informations of the past.
- Table Virtaulization can be done when dealing with larger number of dockets.

## Easily configurable UX
- Acknowledgment popup for every action performed.
- For now errors and correction information are displayed in console, it can modified to show on-screen for layman.

## Future Enhancements
- Fresh set of dockets can be created. 
- More than on docket file that can be managed at time.
- edit and delete dockets.
