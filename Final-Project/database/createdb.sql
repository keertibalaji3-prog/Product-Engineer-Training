

CREATE TABLE OrdersMaster (
    OrderID INT IDENTITY PRIMARY KEY,
    CustomerName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100),
    Phone NVARCHAR(20),
    ProductName NVARCHAR(100) NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(10,2) NOT NULL,
    TotalAmount AS (Quantity * Price) PERSISTED,
    OrderDate DATETIME DEFAULT GETDATE(),
    Status NVARCHAR(20) CHECK (Status IN ('Pending', 'In Process', 'Completed')),
    TrackingID NVARCHAR(50),
    Location NVARCHAR(100)
);

