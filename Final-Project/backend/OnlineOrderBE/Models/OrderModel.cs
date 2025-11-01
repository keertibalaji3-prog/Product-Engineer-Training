namespace OnlineOrderingAPI.Models
{
    public class OrderModel
    {
        public int OrderID { get; set; }
        public string CustomerName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        public string TrackingID { get; set; }
        public string Location { get; set; }
    }
}

