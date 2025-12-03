import { useState } from 'react';
import { Upload, ChevronDown, FileText, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import './EmployeeDetails.css';
import * as auth from '../services/auth';
import { useNavigate } from 'react-router-dom';
import farallonLogo from '../../public/farallon-logo.svg';

export default function EmployeeDetails() {
  const [investorPdf, setInvestorPdf] = useState<File | null>(null);
  const [supplementalPdf, setSupplementalPdf] = useState<File | null>(null);
  const [allocationExcel, setAllocationExcel] = useState<File | null>(null);

  const [selectedFund, setSelectedFund] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  function handleLogout() {
    auth.logout();
    navigate('/login', { replace: true });
  }

  async function handleGenerateReport() {

    if (!investorPdf || !supplementalPdf || !allocationExcel) {
      alert("Please upload all required files");
      return;
    }

    const formData = new FormData();
    formData.append("fund", selectedFund);
    formData.append("month", selectedMonth);
    formData.append("year", selectedYear);

    formData.append("investorPdf", investorPdf);
    formData.append("supplementalPdf", supplementalPdf);
    formData.append("allocationExcel", allocationExcel);

    const response = await fetch("https://localhost:7146/weatherforecast/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);

    alert("Report Generated Successfully!");
  }


  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>
  ) 
  {
    const file = event.target.files?.[0];
    if (file) setFile(file);
  }



  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-left">
          <img src={farallonLogo} alt="farallonLogo" />
        </div>
        <div className="header-right">
          <button className="header-button">
            <span>Admin</span>
            <ChevronDown size={16} />
          </button>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="app-main">


        <div className="form-section">
          <h1 className="section-title">Generate Reconciliation Report</h1>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                Funds<span className="required-asterisk">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Funds</option>
                  <option value="fund1">Fund 1</option>
                  <option value="fund2">Fund 2</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Month<span className="required-asterisk">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="form-select">
                  <option value="">Select Month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                Year<span className="required-asterisk">*</span>
              </label>
              <div className="select-wrapper">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="form-select">
                  <option value="">Select Year</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>
          </div>

          <div className="upload-section">
            <h2 className="upload-title">Upload Files</h2>

            <div className="upload-list">

              {/* Investor PDF */}
              <div className="upload-row">
                <div className="upload-input-group">
                  <label className="form-label">
                    Investor PDF<span className="required-asterisk">*</span>
                  </label>

                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Upload Investor PDF"
                      value={investorPdf?.name || ""}
                      readOnly
                    />
                    <Upload className="input-icon" size={20} />
                  </div>
                </div>

                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  id="investor-file"
                  onChange={(e) => handleFileUpload(e, setInvestorPdf)}
                />
                <button className="upload-button" onClick={() => document.getElementById("investor-file")?.click()}>
                  Upload
                </button>
              </div>


              {/* Supplemental PDF */}
              {selectedFund === "fund1" && (<div className="upload-row">
                <div className="upload-input-group">
                  <label className="form-label">
                    Supplemental PDF<span className="required-asterisk">*</span>
                  </label>

                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Upload Supplemental PDF"
                      value={supplementalPdf?.name || ""}
                      readOnly
                    />
                    <Upload className="input-icon" size={20} />
                  </div>
                </div>

                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  id="supplemental-file"
                  onChange={(e) => handleFileUpload(e, setSupplementalPdf)}
                />

                <button
                  className="upload-button"
                  onClick={() => document.getElementById("supplemental-file")?.click()}
                >
                  Upload
                </button>
              </div>)}



              {/* Allocation Excel */}
              <div className="upload-row">
                <div className="upload-input-group">
                  <label className="form-label">
                    Allocation Excel<span className="required-asterisk">*</span>
                  </label>

                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Upload Allocation Excel"
                      value={allocationExcel?.name || ""}
                      readOnly
                    />
                    <Upload className="input-icon" size={20} />
                  </div>
                </div>

                <input
                  type="file"
                  accept=".xlsx,.xls"
                  style={{ display: "none" }}
                  id="allocation-file"
                  onChange={(e) => handleFileUpload(e, setAllocationExcel)}
                />

                <button
                  className="upload-button"
                  onClick={() => document.getElementById("allocation-file")?.click()}
                >
                  Upload
                </button>
              </div>


            </div>
          </div>

          <div className="form-actions">
            <button className="submit-button" onClick={handleGenerateReport}>
              Generate Reconciliation Report
            </button>
          </div>
        </div>

        <div className="table-section">
          <div className="table-header">
            <h2>Reports History</h2>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>
                    <div className="header-cell">
                      Sr.No
                      <ChevronDown size={16} />
                    </div>
                  </th>
                  <th>
                    <div className="header-cell">
                      File Name
                      <ChevronDown size={16} />
                    </div>
                  </th>
                  <th>
                    <div className="header-cell">
                      Processed Date
                      <ChevronDown size={16} />
                    </div>
                  </th>
                  <th>
                    <div className="header-cell">
                      Report Status
                      <ChevronDown size={16} />
                    </div>
                  </th>
                  <th>
                    <div className="header-cell">
                      Report Generated File Path
                      <ChevronDown size={16} />
                    </div>
                  </th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((row) => (
                  <tr key={row}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <button className="download-button">
                        <FileText size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="footer-text">1 - 10 of 40 items</div>
            <div className="pagination-controls">
              <div className="rows-per-page">
                <span>Rows per page</span>
                <div className="select-wrapper">
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="form-select-small"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              <div className="footer-text">1-10 of 4</div>
              <div className="pagination-buttons">
                <button className="pagination-button">
                  <ChevronsLeft size={20} />
                </button>
                <button className="pagination-button">
                  <ChevronLeft size={20} />
                </button>
                <button className="pagination-button">
                  <ChevronRight size={20} />
                </button>
                <button className="pagination-button">
                  <ChevronsRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        © 2025 Farallon Capital Management, L.L.C. All Rights Reserved.
      </footer>
    </div>
  );
}

