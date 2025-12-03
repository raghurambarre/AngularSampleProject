using Microsoft.AspNetCore.Mvc;

namespace SampleAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IWebHostEnvironment _env;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IWebHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }       

        [HttpPost("upload")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadReport(
            [FromForm] string fund,
            [FromForm] string month,
            [FromForm] string year,
            [FromForm] IFormFile investorPdf,
            [FromForm] IFormFile supplementalPdf,
            [FromForm] IFormFile allocationExcel)
        {


            if (investorPdf == null || supplementalPdf == null || allocationExcel == null) 
            { 
                return BadRequest("All files required");
            }

            // CREATE FOLDER
            string uploadPath = Path.Combine(_env.ContentRootPath, "UploadedFiles");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            // SAVE FILES
            string investorPath = Path.Combine(uploadPath, investorPdf.FileName);
            string supplementalPath = Path.Combine(uploadPath, supplementalPdf.FileName);
            string allocationPath = Path.Combine(uploadPath, allocationExcel.FileName);

            using (var stream = new FileStream(investorPath, FileMode.Create))
                await investorPdf.CopyToAsync(stream);

            using (var stream = new FileStream(supplementalPath, FileMode.Create))
                await supplementalPdf.CopyToAsync(stream);

            using (var stream = new FileStream(allocationPath, FileMode.Create))
                await allocationExcel.CopyToAsync(stream);

            // You can now process files and generate reconciliation logic here.

            return Ok(new
            {
                success = true,
                message = "Files uploaded",
                savedFiles = new
                {
                    investor = investorPath,
                    supplemental = supplementalPath,
                    allocation = allocationPath
                }
            });
        }
    }
}
