using System.Data;
using System.Data.SqlClient;
using OnlineOrderingAPI.Models;
using Microsoft.Extensions.Configuration;

namespace OnlineOrderingAPI.DataAccess
{
    public class OrderDAL
    {
        private readonly string _connectionString;

        public OrderDAL(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DBConnection");
        }

        // GET ALL ORDERS
        public IEnumerable<OrderModel> GetAllOrders()
        {
            List<OrderModel> orders = new List<OrderModel>();

            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM OrdersMaster", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    orders.Add(new OrderModel
                    {
                        OrderID = Convert.ToInt32(rdr["OrderID"]),
                        CustomerName = rdr["CustomerName"].ToString(),
                        Email = rdr["Email"].ToString(),
                        Phone = rdr["Phone"].ToString(),
                        ProductName = rdr["ProductName"].ToString(),
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        Price = Convert.ToDecimal(rdr["Price"]),
                        TotalAmount = Convert.ToDecimal(rdr["TotalAmount"]),
                        OrderDate = Convert.ToDateTime(rdr["OrderDate"]),
                        Status = rdr["Status"].ToString(),
                        TrackingID = rdr["TrackingID"].ToString(),
                        Location = rdr["Location"].ToString()
                    });
                }
                con.Close();
            }

            return orders;
        }

        // GET BY ID
        public OrderModel GetOrderById(int id)
        {
            OrderModel order = null;

            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("SELECT * FROM OrdersMaster WHERE OrderID = @OrderID", con);
                cmd.Parameters.AddWithValue("@OrderID", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                if (rdr.Read())
                {
                    order = new OrderModel
                    {
                        OrderID = Convert.ToInt32(rdr["OrderID"]),
                        CustomerName = rdr["CustomerName"].ToString(),
                        Email = rdr["Email"].ToString(),
                        Phone = rdr["Phone"].ToString(),
                        ProductName = rdr["ProductName"].ToString(),
                        Quantity = Convert.ToInt32(rdr["Quantity"]),
                        Price = Convert.ToDecimal(rdr["Price"]),
                        TotalAmount = Convert.ToDecimal(rdr["TotalAmount"]),
                        OrderDate = Convert.ToDateTime(rdr["OrderDate"]),
                        Status = rdr["Status"].ToString(),
                        TrackingID = rdr["TrackingID"].ToString(),
                        Location = rdr["Location"].ToString()
                    };
                }
                con.Close();
            }

            return order;
        }

        // INSERT
        public void AddOrder(OrderModel order)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = @"INSERT INTO OrdersMaster (CustomerName, Email, Phone, ProductName, Quantity, Price, Status, TrackingID, Location)
                                 VALUES (@CustomerName, @Email, @Phone, @ProductName, @Quantity, @Price, @Status, @TrackingID, @Location)";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@CustomerName", order.CustomerName);
                cmd.Parameters.AddWithValue("@Email", order.Email);
                cmd.Parameters.AddWithValue("@Phone", order.Phone);
                cmd.Parameters.AddWithValue("@ProductName", order.ProductName);
                cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                cmd.Parameters.AddWithValue("@Price", order.Price);
                cmd.Parameters.AddWithValue("@Status", order.Status);
                cmd.Parameters.AddWithValue("@TrackingID", order.TrackingID);
                cmd.Parameters.AddWithValue("@Location", order.Location);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        // UPDATE
        public void UpdateOrder(OrderModel order)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                string query = @"UPDATE OrdersMaster SET 
                                 CustomerName=@CustomerName, Email=@Email, Phone=@Phone, ProductName=@ProductName, 
                                 Quantity=@Quantity, Price=@Price, Status=@Status, TrackingID=@TrackingID, Location=@Location
                                 WHERE OrderID=@OrderID";
                SqlCommand cmd = new SqlCommand(query, con);
                cmd.Parameters.AddWithValue("@OrderID", order.OrderID);
                cmd.Parameters.AddWithValue("@CustomerName", order.CustomerName);
                cmd.Parameters.AddWithValue("@Email", order.Email);
                cmd.Parameters.AddWithValue("@Phone", order.Phone);
                cmd.Parameters.AddWithValue("@ProductName", order.ProductName);
                cmd.Parameters.AddWithValue("@Quantity", order.Quantity);
                cmd.Parameters.AddWithValue("@Price", order.Price);
                cmd.Parameters.AddWithValue("@Status", order.Status);
                cmd.Parameters.AddWithValue("@TrackingID", order.TrackingID);
                cmd.Parameters.AddWithValue("@Location", order.Location);

                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }

        // DELETE
        public void DeleteOrder(int id)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand("DELETE FROM OrdersMaster WHERE OrderID=@OrderID", con);
                cmd.Parameters.AddWithValue("@OrderID", id);
                con.Open();
                cmd.ExecuteNonQuery();
                con.Close();
            }
        }
    }
}
