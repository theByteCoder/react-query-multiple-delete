This is a POC project for applying multiple delete functionality with react-query using useMutations.

steps to setup employees db -

The Employees database is available from Employees DB on https://github.com/datacharmer/test_db. You can download a prepackaged archive of the data, or access the information through Git.

To use the Zip archive package, download the archive and unpack it using WinZip or another tool that can read .zip files, then change location into the unpacked package directory. For example, using unzip, execute these commands:

shell> unzip test_db-master.zip
shell> cd test_db-master/

The Employees database is compatible with several different storage engines, with the InnoDB engine enabled by default. Edit the employees.sql file and adjust the comments to choose a different storage engine:

   set storage_engine = InnoDB;
-- set storage_engine = MyISAM;
-- set storage_engine = Falcon;
-- set storage_engine = PBXT;
-- set storage_engine = Maria;
To import the data into your MySQL instance, load the data through the mysql command-line tool:


shell> mysql -t < employees.sql
+-----------------------------+
| INFO                        |
+-----------------------------+
| CREATING DATABASE STRUCTURE |
+-----------------------------+
+------------------------+
| INFO                   |
+------------------------+
| storage engine: InnoDB |
+------------------------+
+---------------------+
| INFO                |
+---------------------+
| LOADING departments |
+---------------------+
+-------------------+
| INFO              |
+-------------------+
| LOADING employees |
+-------------------+
+------------------+
| INFO             |
+------------------+
| LOADING dept_emp |
+------------------+
+----------------------+
| INFO                 |
+----------------------+
| LOADING dept_manager |
+----------------------+
+----------------+
| INFO           |
+----------------+
| LOADING titles |
+----------------+
+------------------+
| INFO             |
+------------------+
| LOADING salaries |
+------------------+
