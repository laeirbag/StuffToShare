/////////////////////////////////////////////////////////////////////////////
// Name:        wxGradientButton.h
// Purpose:
// Author:      Volodymir (T-Rex) Tryapichko
// Modified by:
// Created:     01/08/2008 20:25:42
// RCS-ID:
// Copyright:   Volodymir (T-Rex) Tryapichko, 2008
// Licence:
/////////////////////////////////////////////////////////////////////////////

#ifndef _WXGRADIENTBUTTON_H_
#define _WXGRADIENTBUTTON_H_

#include "wx/wxprec.h"

#ifdef __BORLANDC__
#pragma hdrstop
#endif

#ifndef WX_PRECOMP
#include "wx/wx.h"
#endif

////@begin includes
////@end includes
#include <wx/dcbuffer.h>


/*!
* Includes
*/

////@begin includes
////@end includes

/*!
* Forward declarations
*/

////@begin forward declarations
class wxGradientButton;
////@end forward declarations

/*!
* Control identifiers
*/

////@begin control identifiers
#define ID_WXGRADIENTBUTTON 10003
#define SYMBOL_WXGRADIENTBUTTON_STYLE wxSIMPLE_BORDER|wxFULL_REPAINT_ON_RESIZE
#define SYMBOL_WXGRADIENTBUTTON_IDNAME ID_WXGRADIENTBUTTON
#define SYMBOL_WXGRADIENTBUTTON_SIZE wxSize(100, 100)
#define SYMBOL_WXGRADIENTBUTTON_POSITION wxDefaultPosition
////@end control identifiers

/*!
* wxGradientButton class declaration
*/

class wxGradientButton: public wxWindow
{
DECLARE_DYNAMIC_CLASS( wxGradientButton )
DECLARE_EVENT_TABLE()

wxSize DoGetBestSize() const;
public:
/// Constructors
wxGradientButton();
wxGradientButton(wxWindow* parent,
wxWindowID id = ID_WXGRADIENTBUTTON,
const wxString & label = wxEmptyString,
const wxPoint& pos = wxDefaultPosition,
const wxSize& size = wxSize(100, 100),
long style = wxSIMPLE_BORDER);

/// Creation
bool Create(wxWindow* parent,
wxWindowID id = ID_WXGRADIENTBUTTON,
const wxString & label = wxEmptyString,
const wxPoint& pos = wxDefaultPosition,
const wxSize& size = wxSize(100, 100),
long style = wxSIMPLE_BORDER);

/// Destructor
~wxGradientButton();

/// Initialises member variables
void Init();

/// Creates the controls and sizers
void CreateControls();

////@begin wxGradientButton event handler declarations

/// wxEVT_SIZE event handler for ID_WXGRADIENTBUTTON
void OnSize( wxSizeEvent& event );

/// wxEVT_PAINT event handler for ID_WXGRADIENTBUTTON
void OnPaint( wxPaintEvent& event );

/// wxEVT_ERASE_BACKGROUND event handler for ID_WXGRADIENTBUTTON
void OnEraseBackground( wxEraseEvent& event );

/// wxEVT_LEFT_DOWN event handler for ID_WXGRADIENTBUTTON
void OnLeftDown( wxMouseEvent& event );

/// wxEVT_LEFT_UP event handler for ID_WXGRADIENTBUTTON
void OnLeftUp( wxMouseEvent& event );

////@end wxGradientButton event handler declarations

////@begin wxGradientButton member function declarations

wxString GetLabel() const { return m_Label ; }
void SetLabel(wxString value) { m_Label = value ; }

wxColour GetGradientTopStartColour() const { return m_GradientTopStartColour ; }
void SetGradientTopStartColour(wxColour value) { m_GradientTopStartColour = value ; }

wxColour GetGradientTopEndColour() const { return m_GradientTopEndColour ; }
void SetGradientTopEndColour(wxColour value) { m_GradientTopEndColour = value ; }

wxColour GetGradientBottomStartColour() const { return m_GradientBottomStartColour ; }
void SetGradientBottomStartColour(wxColour value) { m_GradientBottomStartColour = value ; }

wxColour GetGradientBottomEndColour() const { return m_GradientBottomEndColour ; }
void SetGradientBottomEndColour(wxColour value) { m_GradientBottomEndColour = value ; }

wxColour GetPressedColourTop() const { return m_PressedColourTop ; }
void SetPressedColourTop(wxColour value) { m_PressedColourTop = value ; }

wxColour GetPressedColourBottom() const { return m_PressedColourBottom ; }
void SetPressedColourBottom(wxColour value) { m_PressedColourBottom = value ; }

/// Retrieves bitmap resources
wxBitmap GetBitmapResource( const wxString& name );

/// Retrieves icon resources
wxIcon GetIconResource( const wxString& name );
////@end wxGradientButton member function declarations

/// Should we show tooltips?
static bool ShowToolTips();

////@begin wxGradientButton member variables
wxString m_Label;
wxColour m_GradientTopStartColour;
wxColour m_GradientTopEndColour;
wxColour m_GradientBottomStartColour;
wxColour m_GradientBottomEndColour;
wxColour m_PressedColourTop;
wxColour m_PressedColourBottom;
////@end wxGradientButton member variables
};

/////////////////////////////////////////////////////////////////////////////
// Name:        wxGradientButton.cpp
// Purpose:
// Author:      Volodymir (T-Rex) Tryapichko
// Modified by:
// Created:     01/08/2008 20:25:42
// RCS-ID:
// Copyright:   Volodymir (T-Rex) Tryapichko, 2008
// Licence:
/////////////////////////////////////////////////////////////////////////////

// For compilers that support precompilation, includes "wx/wx.h".
////@begin XPM images
////@end XPM images

/*!
* wxGradientButton type definition
*/

IMPLEMENT_DYNAMIC_CLASS( wxGradientButton, wxWindow )

/*!
* wxGradientButton event table definition
*/

BEGIN_EVENT_TABLE( wxGradientButton, wxWindow )

////@begin wxGradientButton event table entries
EVT_SIZE( wxGradientButton::OnSize )
EVT_PAINT( wxGradientButton::OnPaint )
EVT_ERASE_BACKGROUND( wxGradientButton::OnEraseBackground )
EVT_LEFT_DOWN( wxGradientButton::OnLeftDown )
EVT_LEFT_UP( wxGradientButton::OnLeftUp )

////@end wxGradientButton event table entries

END_EVENT_TABLE()

/*!
* wxGradientButton constructors
*/

wxGradientButton::wxGradientButton()
{
	Init();
}

wxGradientButton::wxGradientButton(wxWindow* parent,
wxWindowID id, const wxString & label, const wxPoint& pos,
const wxSize& size, long style)
{
	Init();
	Create(parent, id, label, pos, size, style);
}

/*!
* wxGradientButton creator
*/

bool wxGradientButton::Create(wxWindow* parent,
wxWindowID id, const wxString & label, const wxPoint& pos,
const wxSize& size, long style)
{
	////@begin wxGradientButton creation
	wxWindow::Create(parent, id, pos, size, style);
	CreateControls();
	////@end wxGradientButton creation
	m_Label = label;
	return true;
}

/*!
* wxGradientButton destructor
*/

wxGradientButton::~wxGradientButton()
{
////@begin wxGradientButton destruction
////@end wxGradientButton destruction
}

/*!
* Member initialisation
*/

void wxGradientButton::Init()
{
	////@begin wxGradientButton member initialisation
	m_GradientTopStartColour = wxColour(132,125,132);
	m_GradientTopEndColour = wxColour(74,69,74);
	m_GradientBottomStartColour = wxColour(0,0,0);
	m_GradientBottomEndColour = wxColour(57,56,57);
	m_PressedColourTop = wxColour(57,56,57);
	m_PressedColourBottom = wxColour(0,0,0);
	////@end wxGradientButton member initialisation
}

/*!
* Control creation for wxGradientButton
*/

void wxGradientButton::CreateControls()
{
	////@begin wxGradientButton content construction
	this->SetForegroundColour(wxColour(255, 255, 255));
	this->SetBackgroundColour(wxColour(0, 0, 0));
	this->SetFont(wxFont(8, wxSWISS, wxNORMAL, wxBOLD, false, wxT("Tahoma")));
	////@end wxGradientButton content construction
}

/*!
* Should we show tooltips?
*/

bool wxGradientButton::ShowToolTips()
{
return true;
}

/*!
* Get bitmap resources
*/

wxBitmap wxGradientButton::GetBitmapResource( const wxString& name )
{
	// Bitmap retrieval
	////@begin wxGradientButton bitmap retrieval
	wxUnusedVar(name);
	return wxNullBitmap;
	////@end wxGradientButton bitmap retrieval
}

/*!
* Get icon resources
*/

wxIcon wxGradientButton::GetIconResource( const wxString& name )
{
	// Icon retrieval
	////@begin wxGradientButton icon retrieval
	wxUnusedVar(name);
	return wxNullIcon;
	////@end wxGradientButton icon retrieval
}

wxSize wxGradientButton::DoGetBestSize() const
{
	wxSize labelSize = wxDefaultSize;
	GetTextExtent(m_Label, &labelSize.x, &labelSize.y);
	return wxSize(wxMax(40, labelSize.x + 20), wxMax(20, labelSize.y + 10));
}

/*!
* wxEVT_PAINT event handler for ID_WXGRADIENTBUTTON
*/

void wxGradientButton::OnPaint( wxPaintEvent& event )
{
	// Before editing this code, remove the block markers.
	wxBufferedPaintDC dc(this);

	wxRect clientRect = GetClientRect();
	wxRect gradientRect = clientRect;
	gradientRect.SetHeight(gradientRect.GetHeight()/2 + ((GetCapture() == this) ? 1 : 0));
	if(GetCapture() != this)
	{
		dc.GradientFillLinear(gradientRect,
		m_GradientTopStartColour, m_GradientTopEndColour, wxSOUTH);
	}
	else
	{
		dc.SetPen(wxPen(m_PressedColourTop));
		dc.SetBrush(wxBrush(m_PressedColourTop));
		dc.DrawRectangle(gradientRect);
	}

	gradientRect.Offset(0, gradientRect.GetHeight());

	if(GetCapture() != this)
	{
		dc.GradientFillLinear(gradientRect,
		m_GradientBottomStartColour, m_GradientBottomEndColour, wxSOUTH);
	}
	else
	{
		dc.SetPen(wxPen(m_PressedColourBottom));
		dc.SetBrush(wxBrush(m_PressedColourBottom));
		dc.DrawRectangle(gradientRect);
	}

	dc.SetPen(wxPen(GetBackgroundColour()));
	dc.SetBrush(*wxTRANSPARENT_BRUSH);
	dc.DrawRectangle(0, 0, clientRect.GetWidth(), clientRect.GetHeight());
	dc.SetFont(GetFont());
	dc.SetTextForeground(GetForegroundColour());

	if(GetCapture() == this)
	{
		clientRect.Offset(1, 1);
	}

	dc.DrawLabel(m_Label, clientRect, wxALIGN_CENTER_HORIZONTAL|wxALIGN_CENTER_VERTICAL);
}

/*!
* wxEVT_LEFT_DOWN event handler for ID_WXGRADIENTBUTTON
*/

void wxGradientButton::OnLeftDown( wxMouseEvent& event )
{
	if(GetCapture() != this)
	{
		CaptureMouse();
		Refresh();
	}
}

/*!
* wxEVT_LEFT_UP event handler for ID_WXGRADIENTBUTTON
*/

void wxGradientButton::OnLeftUp( wxMouseEvent& event )
{
	if(GetCapture() == this)
	{
		ReleaseMouse();
		Refresh();
		if(GetClientRect().Contains(event.GetPosition()))
		{
			wxCommandEvent evt(wxEVT_COMMAND_BUTTON_CLICKED, GetId());
			GetEventHandler()->AddPendingEvent(evt);
		}
	}
}

/*!
* wxEVT_ERASE_BACKGROUND event handler for ID_WXGRADIENTBUTTON
*/

void wxGradientButton::OnEraseBackground( wxEraseEvent& event )
{}

/*!
* wxEVT_SIZE event handler for ID_WXGRADIENTBUTTON
*/

void wxGradientButton::OnSize( wxSizeEvent& event )
{
	Refresh();
}

#endif
// _WXGRADIENTBUTTON_H_

